export default {
  name: 'question',
  title: 'Question',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string'
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy'
    },
    {
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [{ type: 'save' }]
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'comment' }]
    }
  ]
};
