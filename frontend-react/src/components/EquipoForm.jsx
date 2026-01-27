export default function EquipoForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>

      <label htmlFor="entrada">No. de Entrada</label>
      <input
        type="number"
        id="entrada"
        name="entrada"
        value={formData.entrada}
        onChange={onChange}
        placeholder="No. de entrada"
        required
      />

      <label htmlFor="clienteNombre">Nombre del Cliente</label>
      <input
        type="text"
        id="clienteNombre"
        name="clienteNombre"
        value={formData.clienteNombre}
        onChange={onChange}
        placeholder="Bruce Wayne"
      />

      <label htmlFor="clienteEmpresa">Empresa</label>
      <input
        type="text"
        id="clienteEmpresa"
        name="clienteEmpresa"
        value={formData.clienteEmpresa}
        onChange={onChange}
        placeholder="Industrias Wayne"
      />

      <label htmlFor="clienteRNC">RNC</label>
      <input
        type="text"
        id="clienteRNC"
        name="clienteRNC"
        value={formData.clienteRNC}
        onChange={onChange}
        placeholder="131234567"
      />

      <label htmlFor="clienteTelefono">Teléfono</label>
      <input
        type="text"
        id="clienteTelefono"
        name="clienteTelefono"
        value={formData.clienteTelefono}
        onChange={onChange}
        placeholder="8093334444"
      />

      <label htmlFor="clienteEmail">Correo Electrónico</label>
      <input
        type="email"
        id="clienteEmail"
        name="clienteEmail"
        value={formData.clienteEmail}
        onChange={onChange}
        placeholder="b.wayne@batman.com"
      />

      <label htmlFor="equipo">Equipo</label>
      <select
        id="equipo"
        name="equipo"
        value={formData.equipo}
        onChange={onChange}
        required
      >
        <option value="">Seleccione</option>
        <option value="Estacion Total">Estación Total</option>
        <option value="Receptor GNSS">Receptor GNSS</option>
        <option value="Colector De Datos">Colector De Datos</option>
        <option value="Nivel Automatico">Nivel Automático</option>
        <option value="Nivel Laser">Nivel Láser</option>
      </select>

      <label htmlFor="marca">Marca</label>
      <input
        type="text"
        id="marca"
        name="marca"
        value={formData.marca}
        onChange={onChange}
        placeholder="Marca"
      />

      <label htmlFor="modelo">Modelo</label>
      <input
        type="text"
        id="modelo"
        name="modelo"
        value={formData.modelo}
        onChange={onChange}
        placeholder="Modelo"
      />

      <label htmlFor="serial">Serial</label>
      <input
        type="text"
        id="serial"
        name="serial"
        value={formData.serial}
        onChange={onChange}
        placeholder="No. de serial"
      />

      <label htmlFor="accesorios">Accesorios</label>
      <input
        type="text"
        id="accesorios"
        name="accesorios"
        value={formData.accesorios}
        onChange={onChange}
        placeholder="Batigancho, batibúmeran..."
      />

      <button type="submit">Dar entrada</button>
    </form>
  );
}


/*

<div class="form">

                <form method="post" id="formbody">

                    <label for="id">No. De Entrada</label>
                    <input type="number" id="id" name="id" placeholder="No. de entrada"/>

                    <label for="clientname">Nombre Del Cliente</label>
                    <input type="text" id="clientname" name="clientname" placeholder="Bruce Wayne"/>

                    <label for="clientcompany">Empresa</label>
                    <input type="text" id="clientcompany" name="clientcompany" placeholder="Industrias Wayne"/>

                    <label for="RNC">RNC</label>
                    <input type="text" id="RNC" name="RNC" placeholder="131234567"/>

                    <label for="clientphone">Telefono</label>
                    <input type="text" id="clientphone" name="clientphone" placeholder="8093334444"/>

                    <label for="clientmail">Correo Electronico</label>
                    <input type="text" id="clientmail" name="clientmail" placeholder="B.wayne@batman.com"/>

                    <label for="equipment">Equipo</label>
                    <select id="equipment" name="equipment">
                        <option value="Estacion Total">Estacion Total</option>
                        <option value="Receptor GNSS">Receptor GNSS</option>
                        <option value="Colector De Datos">Colector De Datos</option>
                        <option value="Nivel Automatico">Nivel Automatico</option>
                        <option value="Nivel Laser">Nivel Laser</option>
                    </select>

                    <label for="brand">Marca</label>
                    <input type="text" name="brand" id="brand" placeholder="Marca"/>
            
                    <label for="model">Modelo</label>
                    <input type="text" name="model" id="model" placeholder="Modelo"/>

                    <label for="serial">Serial</label>
                    <input type="text" name="serial" id="serial" placeholder="No. de serial"/>

                    <label for="accesories">Accesorios</label>
                    <input type="text" name="accesories" id="accesories" placeholder="Batigancho, batibumeran, batigalletas..."/>

                    <input class="submitbutton" type="submit" value="Submit">
                </form>

            </div>

*/