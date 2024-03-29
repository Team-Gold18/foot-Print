const sql = require("./db");

// constructor
const Document = function (data) {
  this.doctor_id = data.doctor_id;
  this.document_name = data.document_name;
  this.documentFile = data.documentFile;
  this.cloudinary_id = data.cloudinary_id;
  this.created_at = data.created_at;
};

Document.uploadDocuments = (newDocument, result) => {
  sql.query("INSERT INTO documents SET ?", newDocument, (err, res) => {
    if (err) {
      //   console.log("error: ", err);
      result(err, "");
      return;
    }

    // console.log("res",res );
    result("", { id: res.insertId, ...newDocument });
  });
};

Document.getAllDocuments = (result) => {
  sql.query("SELECT * FROM documents", (err, res) => {
    if (err) {
      result(err, "");
      return;
    }
    if (result.length) {
      result("", res);
      return;
    }
    result("", "");
    return;
  });
};

//hgvkghv
Document.getDocumentById = (id, result) => {
  sql.query(`SELECT * FROM documents WHERE id = '${id}'`, (err, res) => {
    if (err) {
      result(err, "");
      return;
    }
    if (res.length) {
      result("", res);
      return;
    }
    result("", "");
    return;
  });
};

Document.getDocumentByDoctorId = (doctor_id, result) => {
  sql.query(
    `SELECT * FROM documents WHERE doctor_id = '${doctor_id}'`,
    (err, res) => {
      if (err) {
        result(err, "");
        return;
      }
      if (res.length) {
        result("", res);
        return;
      }
      result("", "");
      return;
    }
  );
};

Document.getDocumentByLogedDoctor = (user_id, result) => {
  sql.query(
    `SELECT * FROM documents WHERE doctor_id = '${user_id}'`,
    (err, res) => {
      if (err) {
        result(err, "");
        return;
      }
      if (res.length) {
        result("", res);
        return;
      }
      result("", "");
      return;
    }
  );
};

Document.getDocumentByName = (name, result) => {
  console.log("name", name);
  sql.query(
    `SELECT * FROM documents WHERE document_name = '${name}'`,
    (err, res) => {
      if (err) {
        result(err, "");
        return;
      }
      console.log(res);
      if (res.length) {
        result("", res);
        return;
      }
      result("", "");
      return;
    }
  );
};

Document.sortDocumentsByName = (result) => {
  sql.query(
    "SELECT * FROM documents ORDER BY document_name ASC",
    (err, res) => {
      if (err) {
        result(err, "");
        return;
      }
      if (result.length) {
        result("", res);
        return;
      }
      result("", "");
      return;
    }
  );
};

Document.sortDocumentsByDate = (result) => {
  sql.query("SELECT * FROM documents ORDER BY created_at ASC", (err, res) => {
    if (err) {
      result(err, "");
      return;
    }
    if (result.length) {
      result("", res);
      return;
    }
    result("", "");
    return;
  });
};

Document.updateDocument = (id, updatedDocument, result) => {
  sql.query(
    `UPDATE documents SET 
    doctor_id='${updatedDocument.doctor_id}', 
    document_name='${updatedDocument.document_name}',
    documentFile='${updatedDocument.documentFile}',
    cloudinary_id='${updatedDocument.cloudinary_id}'  WHERE id='${id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, "");
        return;
      }

      if (res.affectedRows === 1) {
        result("", { id: id, ...updatedDocument });
        return;
      }

      result("", "");
      return;
    }
  );
};

Document.deleteDocument = (id, result) => {
  sql.query(`DELETE FROM documents WHERE id ='${id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, "");
      return;
    }

    if (res) {
      result("", res);
      return;
    }

    result("", "");
  });
};

module.exports = Document;
