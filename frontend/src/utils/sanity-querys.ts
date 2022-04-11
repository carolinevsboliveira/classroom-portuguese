export const teachers = `*[_type == 'user' && isInstructor == true]`;
export const currentTeacherUserName = (id: string) =>
  `*[_type == 'user' && _id == '${id}'][0]{userName}`;

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

export const currentClass = (id: string) =>
  `*[_type == 'classroom' && _id == '${id}'][0]`;
