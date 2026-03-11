import CatalogCrudPage from '../components/CatalogCrudPage';

const fields = [{ name: 'nombre', label: 'Nombre *', required: true }];

const columns = [{ key: 'nombre', header: 'Nombre' }];

function TipoPage() {
  return (
    <CatalogCrudPage
      title="Tipo"
      endpoint="/tipos"
      fields={fields}
      emptyRecord={{ nombre: '' }}
      buildPayload={(form) => ({ nombre: form.nombre })}
      tableColumns={columns}
    />
  );
}

export default TipoPage;
