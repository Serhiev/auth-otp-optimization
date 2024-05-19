export const getMetaUserData = async () => {
  // Збір основних даних
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const connectionType = navigator.connection ? navigator.connection.effectiveType : 'unknown';
  const language = navigator.language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Функція для збору геолокаційних даних
  const getGeolocation = () => {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting geolocation:', error);
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  
  // Збір даних
  const userData = {
    userAgent,
    platform,
    connectionType,
    language,
    timeZone,
    geolocation: '',
    ip: ''
  };
  
  // try {
  //   const geolocation = await getGeolocation();
  //   userData.geolocation = `${geolocation.latitude} ${geolocation.longitude}`;
  // } catch (error) {
  //   userData.geolocationError = error.message;
  // }

  return userData
}