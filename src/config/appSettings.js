let appSettings = {
  orgInfo: {
    name: 'Shop Name',
    address: '',
    ownerName: '',
    contactEmail: '',
    contactPhone: '',
  },
};

export const setAppSettings = settings => {
  appSettings = {
    ...appSettings,
    ...settings,
  };
};

export const getAppSettings = () => appSettings;

export const getOrgName = () => {
  const name = appSettings?.orgInfo?.name;
  return name && name.trim().length > 0 ? name : 'Shop Name';
};
