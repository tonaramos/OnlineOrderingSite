const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export { updateObject as default };
