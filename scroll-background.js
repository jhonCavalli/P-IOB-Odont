/* GSAP ScrollTrigger: the scroll position is the video's playback control. */
window.initIOBScroll = function initIOBScroll(video) {
  if (!video) return undefined;
  video.pause();
  if (!window.gsap || !window.ScrollTrigger) return undefined;

  gsap.registerPlugin(ScrollTrigger);
  
  const media = gsap.matchMedia();
  let disposed = false;
  let initialized = false;

  function setup() {
    if (disposed || initialized || !Number.isFinite(video.duration) || video.duration <= 0) return;
    initialized = true;
    video.currentTime = Math.min(0.001, video.duration);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const playhead = { time: 0 };
      const lastFrame = Math.max(0, video.duration - 0.05);
      let active = true;
      // Coalesce seeks: decoding a frame may take longer than a scroll update.
      function seek() {
        if (!active || video.seeking || video.readyState < 1) return;
        const target = Math.min(lastFrame, Math.max(0, playhead.time));
        if (Math.abs(video.currentTime - target) > 0.025) video.currentTime = target;
      }
      video.addEventListener('seeked', seek);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: "max",
          scrub: 0.45,
          invalidateOnRefresh: true
        }
      });
      timeline.to(playhead, { time: lastFrame, duration: 1, ease: 'none', onUpdate: seek }, 0);
      timeline.fromTo(video, { scale: 1.06, yPercent: 0 }, {
        scale: 1.16, yPercent: -3, duration: 1, ease: 'none'
      }, 0);
      return () => {
        active = false;
        video.removeEventListener('seeked', seek);
        video.pause();
        video.currentTime = 0;
      };
    });
  }
  function stop() { media.revert(); video.pause(); }
  video.addEventListener('loadedmetadata', setup);
  video.addEventListener('error', stop);
  setup();
  return () => {
    disposed = true;
    video.removeEventListener('loadedmetadata', setup);
    video.removeEventListener('error', stop);
    media.revert();
    video.pause();
  };
};
