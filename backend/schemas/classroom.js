export default {
  name: 'classroom',
  title: 'Classroom',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'time',
      title: 'Time',
      type: 'datetime'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        allowedMimeTypes: ['application/pdf']
      }
    },

    {
      name: 'link',
      title: 'Link',
      type: 'string'
    },
    {
      name: 'teacher',
      title: 'Teacher',
      type: 'teacher'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'number'
    }
  ],
  initialValue: {
    image: 'image-461cd5a0e8c59bae4c8812e6494fbc81e0e0df1e-2121x1414-jpg',
    file: 'file-8d758653244b7ca6a1cc4a978ab02a220adf4cc7-pdf'
  }
};
