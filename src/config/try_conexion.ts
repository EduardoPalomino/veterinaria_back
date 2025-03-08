import conBD from './conexion';
import User from '../models/Usuario';

export  const connectToDatabase = async () => {
    try {
      await conBD(); // Conexión a la base de datos
      console.log(`🗃️ [db]: MongoDB connected`);
  
      // Consultar usuarios
      const users = await User.find().limit(5); // Consulta los primeros 5 usuarios
  
      // Mostrar los resultados en la consola
      console.log(`Usuarios en la base de datos ecuanticorp_admin:`);
      users.forEach(user => {
        console.log(`Name: ${user.nombre}, Username: ${user.email}, Role: ${user.rol_id}`);
      });
    } catch (error: any) {
      console.error(`❌ [db]: Error connecting to MongoDB: ${error.message}`);
    }
  };
  
