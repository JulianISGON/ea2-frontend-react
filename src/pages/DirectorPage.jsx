import CatalogCrudPage from '../components/CatalogCrudPage';

const fields = [
  { name: 'nombre', label: 'Nombre *', required: true },
  { name: 'estado', label: 'Activo', type: 'checkbox' },
];

const columns = [
  { key: 'nombre', header: 'Nombre' },
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

function DirectorPage() {
  return (
    <CatalogCrudPage
      title="Director"
      endpoint="/directores"
      fields={fields}
      emptyRecord={{ nombre: '', estado: true }}
      buildPayload={(form) => ({
        nombre: form.nombre,
        estado: form.estado ? 1 : 0,
      })}
      tableColumns={columns}
    />
  );
}

export default DirectorPage;
