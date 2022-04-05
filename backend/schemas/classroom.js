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
  ]
};
