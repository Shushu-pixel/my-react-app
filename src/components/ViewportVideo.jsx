import { useEffect, useRef } from 'react';

function isHalfInViewport(video) {
  const rect = video.getBoundingClientRect();
  const width = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
  const height = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
  return rect.width > 0 && rect.height > 0 && width * height / (rect.width * rect.height) >= 0.5;
}

const noop = () => {};

export default function ViewportVideo({
  mediaId,
  src,
  registerVideo = noop,
  onAudiblePlayback = noop,
  children = 'Your browser cannot play this video.',
  autoPlay: _autoPlay,
  ...videoProps
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    registerVideo(mediaId, video);
    let active = true;
    let visible = false;
    let manuallyPaused = false;
    let expectedPauses = 0;
    let playPending = false;
    let revision = 0;

    const canPlay = () => active && video.isConnected && visible && !document.hidden && !manuallyPaused && isHalfInViewport(video);
    const pauseForVisibility = () => {
      if (!video.paused) {
        expectedPauses += 1;
        video.pause();
      }
    };
    const playWhenVisible = () => {
      if (!canPlay() || video.ended || !video.paused || playPending) return;
      playPending = true;
      const attemptedRevision = revision;
      let playback;
      try {
        playback = video.play();
      } catch {
        playPending = false;
        return;
      }
      Promise.resolve(playback)
        .then(() => {
          // A play request can finish after scrolling, filtering, or hiding the page.
          if (!canPlay()) pauseForVisibility();
        })
        .catch(() => {
          // Native controls remain usable when the browser declines autoplay.
        })
        .finally(() => {
          playPending = false;
          // Retry only after a real visibility change, never in a rejection loop.
          if (active && revision !== attemptedRevision) playWhenVisible();
        });
    };
    const updateVisibility = (nextVisible) => {
      if (nextVisible === visible) return;
      visible = nextVisible;
      revision += 1;
      if (visible) {
        manuallyPaused = false;
        playWhenVisible();
      } else pauseForVisibility();
    };
    const onPause = () => {
      if (expectedPauses > 0) {
        expectedPauses -= 1;
        return;
      }
      if (active && visible && !document.hidden && !video.ended) {
        manuallyPaused = true;
        revision += 1;
      }
    };
    const onPlay = () => {
      // Ignore a queued play event if the user has already paused the clip.
      if (video.paused) return;
      if (!active || !video.isConnected || !visible || document.hidden || !isHalfInViewport(video)) {
        pauseForVisibility();
        return;
      }
      manuallyPaused = false;
      onAudiblePlayback(video);
    };
    const onVolumeChange = () => {
      if (!video.paused) onAudiblePlayback(video);
    };
    const onVisibilityChange = () => {
      revision += 1;
      if (document.hidden) pauseForVisibility();
      else {
        if (visible && !isHalfInViewport(video)) visible = false;
        playWhenVisible();
      }
    };

    video.addEventListener('pause', onPause);
    video.addEventListener('play', onPlay);
    video.addEventListener('volumechange', onVolumeChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const observer = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver((entries) => {
        if (!active) return;
        entries.forEach((entry) => updateVisibility(entry.isIntersecting && entry.intersectionRatio >= 0.5));
      }, { threshold: [0, 0.5] })
      : null;
    const checkViewport = () => updateVisibility(isHalfInViewport(video));
    if (observer) observer.observe(video);
    else {
      window.addEventListener('scroll', checkViewport, { passive: true });
      window.addEventListener('resize', checkViewport);
      checkViewport();
    }

    return () => {
      active = false;
      observer?.disconnect();
      window.removeEventListener('scroll', checkViewport);
      window.removeEventListener('resize', checkViewport);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('volumechange', onVolumeChange);
      registerVideo(mediaId, null);
      if (!video.paused) video.pause();
    };
  }, [mediaId, src, registerVideo, onAudiblePlayback]);

  return <video
    {...videoProps}
    ref={videoRef}
    src={src}
    controls
    playsInline
    muted
    preload="none"
  >{children}</video>;
}
