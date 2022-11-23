export interface CourseCollection {
  label: string;
  courses: Course[];
}

export interface Course {
  id: string;
  coursename: string;
  courseslug: string;
  faculty: string;
  tags: [
    string
  ]
}

export interface Module {
  modulename: string;
  modulenumber: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  lessondescription: string;
  lessonname: string;
  lessonvideo: [
    uri: string,
  ]
}
