
function createTable(conn){
 
      const sql = "SELECT * FROM pessoa";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('criou a tabela!');
      });
}