export const teachers = `*[_type == 'user' && isInstructor == true]`;
export const classesQuery = `*[_type == 'classroom']`;
export const fileUrlQuery = (classroomId: string) => {
  return `*[_type == "classroom" && _id == '${classroomId}']{
      file{
        asset->{
          url
        }
      }
    }`;
};
