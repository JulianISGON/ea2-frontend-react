import CatalogCrudPage from '../components/CatalogCrudPage';

const fields = [
  { name: 'nombre', label: 'Nombre *', required: true },
  { name: 'eslogan', label: 'Eslogan' },
  { name: 'descripcion', label: 'Descripcion', type: 'textarea' },
  { name: 'estado', label: 'Activo', type: 'checkbox' },
];

const columns = [
  { key: 'nombre', header: 'Nombre' },
  { key: 'eslogan', header: 'Eslogan' },
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

function ProductoraPage() {
  return (
    <CatalogCrudPage
      title="Productora"
      endpoint="/productoras"
      fields={fields}
      emptyRecord={{ nombre: '', eslogan: '', descripcion: '', estado: true }}
      buildPayload={(form) => ({
        nombre: form.nombre,
        eslogan: form.eslogan || null,
        descripcion: form.descripcion || null,
        estado: form.estado ? 1 : 0,
      })}
      tableColumns={columns}
    />
  );
}

export default ProductoraPage;
