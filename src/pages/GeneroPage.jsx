import CatalogCrudPage from '../components/CatalogCrudPage';

const fields = [
  { name: 'nombre', label: 'Nombre *', required: true },
  { name: 'descripcion', label: 'Descripcion', type: 'textarea' },
  { name: 'estado', label: 'Activo', type: 'checkbox' },
];

const columns = [
  { key: 'nombre', header: 'Nombre' },
  { key: 'descripcion', header: 'Descripcion' },
  {
    key: 'estado',
    header: 'Estado',
    render: (value) =>
      Number(value) === 1 ? (
        <span className="ca-badge active"><span className="ca-badge-dot" />Activo</span>
      ) : (
        <span className="ca-badge inactive"><span className="ca-badge-dot" />Inactivo</span>
      ),
  },
];

function GeneroPage() {
  return (
    <CatalogCrudPage
      title="Genero"
      endpoint="/generos"
      fields={fields}
      emptyRecord={{ nombre: '', descripcion: '', estado: true }}
      buildPayload={(form) => ({
        nombre: form.nombre,
        descripcion: form.descripcion || null,
        estado: form.estado ? 1 : 0,
      })}
      tableColumns={columns}
    />
  );
}

export default GeneroPage;
