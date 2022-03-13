export default {
  name: 'classroom',
  title: 'Classroom',
  type: 'document',
  fields: [
    {
      name: 'time',
      title: 'Time',
      type: 'datetime'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string'
    },
    {
      name: 'teacher',
      title: 'Teacher',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'user' } }]
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'number'
    },
    {
      name: 'kind',
      title: 'Kind',
      type: 'string'
    }
  ]
};
