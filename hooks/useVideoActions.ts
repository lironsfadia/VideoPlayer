export function useVideoActions() {
    const handleScrub = (time: number) => {
      // Update video player time
      console.log('Scrubbing to:', time);
      // Implementation needed
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