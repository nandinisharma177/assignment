const Sequelize = require("sequelize");

var sequelize = new Sequelize(
  " bzfmcrrp ",
  " bzfmcrrp ",
  "4RC94asDMXFe4OohLQLtq44nHT51IjNu",
  {
    host: "peanut.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
);

var Student = sequelize.define("Student", {
  studentNum: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  addressStreet: Sequelize.STRING,
  addressCity: Sequelize.STRING,
  addressProvince: Sequelize.STRING,
  TA: Sequelize.BOOLEAN,
  status: Sequelize.STRING,
});

var Course = sequelize.define("Course", {
  courseId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseCode: Sequelize.STRING,
  courseDescription: Sequelize.STRING,
});

Course.hasMany(Student, { foreignKey: "course" });

module.exports.initialize = function () {
  return new Promise(function (resolve, reject) {
    sequelize
      .sync()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("database cannot be synced");
      });
  });
};

module.exports.getAllStudents = function () {
  return new Promise(function (resolve, reject) {
    Student.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("no results ");
      });
  });
};

module.exports.getCourses = function () {
  return new Promise(function (resolve, reject) {
    Course.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("no results ");
      });
  });
};

module.exports.getStudentByNum = function (num) {
  return new Promise(function (resolve, reject) {
    Student.findAll({
      where: {
        studentNum: num,
      },
    })
      .then((data) => {
        resolve(data[0]);
      })
      .catch((err) => {
        reject("no results");
      });
  });
};

module.exports.getStudentsByCourse = function (course) {
  return new Promise(function (resolve, reject) {
    Student.findAll({
      where: {
        course: course,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("no results");
      });
  });
};

module.exports.getCourseById = function (id) {
  return new Promise(function (resolve, reject) {
    Course.findAll({
      where: {
        courseCode: id,
      },
    })
      .then((data) => {
        resolve(data[0]);
      })
      .catch((err) => {
        reject("no results");
      });
  });
};

module.exports.addStudent = function (studentData) {
  return new Promise(function (resolve, reject) {
    studentData.TA = studentData.TA ? true : false;
    for (var prop in studentData) {
      if (studentData[prop] == "") {
        studentData[prop] = null;
      }
    }
    Student.create(studentData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("student creation error");
      });
  });
};

module.exports.updateStudent = function (studentData) {
  return new Promise(function (resolve, reject) {
    studentData.TA = studentData.TA ? true : false;
    for (var prop in studentData) {
      if (studentData[prop] == "") {
        studentData[prop] = null;
      }
    }
    Student.update(studentData, {
      where: {
        studentNum: studentData.studentNum,
      },
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("student updation error");
      });
  });
};

module.exports.addCourse = function (courseData) {
  return new Promise(function (resolve, reject) {
    for (var prop in courseData) {
      if (courseData[prop] == "") {
        courseData[prop] = null;
      }
    }
    Course.create(courseData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("course creation error");
      });
  });
};

module.exports.updateCourse = function (courseData) {
  return new Promise(function (resolve, reject) {
    for (var prop in courseData) {
      if (courseData[prop] == "") {
        courseData[prop] = null;
      }
    }
    Course.update(courseData, {
      where: {
        courseId: courseData.courseId,
      },
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("course updation error");
      });
  });
};

module.exports.deleteCourseById = function (id) {
  return new Promise(function (resolve, reject) {
    Course.destroy({
      where: {
        courseId: id,
      },
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("course unable to delete");
      });
  });
};

module.exports.deleteStudentByNum = function (studentNum) {
  return new Promise(function (resolve, reject) {
    Student.destroy({
      where: {
        studentNum: studentNum,
      },
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("student is not getting deleted");
      });
  });
};
