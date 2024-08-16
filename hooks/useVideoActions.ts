export function useVideoActions() {
  const handleScrub = ({ time, videoRef }) => {
    if (videoRef.current) {
      console.log('Scrubbing video to:', time);
      videoRef.current.seek(time);
    }
  };

  const handleTrim = () => {
    // Logic to set trim points
    console.log('Trimming video');
    // Implementation needed
  };

  const handleSave = () => {
    // Logic to save edited video
    console.log('Saving video');
    // Implementation needed
  };

  return {
    handleScrub,
    handleTrim,
    handleSave,
  };
}
