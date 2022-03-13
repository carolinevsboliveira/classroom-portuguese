export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'userName',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string'
    },
    {
      name: 'isInstructor',
      title: 'isInstructor',
      type: 'boolean'
    }
  ],
  initialValue: {
    isInstructor: false
  }
};
