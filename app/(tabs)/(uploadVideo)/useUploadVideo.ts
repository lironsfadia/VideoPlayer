import DocumentPicker from 'react-native-document-picker';


const useUploadVideo = (onFileSelect) => {
    const pickVideo = async () => {
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.video],
          });
          onFileSelect(res[0]);
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled the picker');
          } else {
            console.error('Error:', err);
          }
        }
      };
      return {pickVideo}
    
}

export default useUploadVideo

