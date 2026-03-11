import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { PlusCircle, Save, ListFilter, Edit2, Trash2, RefreshCw } from 'lucide-react';
import { createByPath, listByPath, removeByPath, updateByPath } from '../api/catalogApi';

function CatalogCrudPage({
  title,
  endpoint,
  fields,
  emptyRecord,
  buildPayload,
  tableColumns,
}) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(emptyRecord);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  async function loadRecords() {
    setLoading(true);
    try {
      const rows = await listByPath(endpoint);
      setRecords(rows);
    } catch (error) {
      await Swal.fire('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  function resetForm() {
    setForm(emptyRecord);
    setEditingId(null);
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = buildPayload(form);

    try {
      if (isEditing) {
        await updateByPath(endpoint, editingId, payload);
        await Swal.fire('Listo', `${title} actualizado correctamente`, 'success');
      } else {
        await createByPath(endpoint, payload);
        await Swal.fire('Listo', `${title} creado correctamente`, 'success');
      }

      resetForm();
      loadRecords();
    } catch (error) {
      await Swal.fire('Error', error.message, 'error');
    }
  }

  function startEdit(record) {
    const next = { ...emptyRecord };
    Object.keys(next).forEach((key) => {
      if (record[key] !== undefined && record[key] !== null) {
        next[key] = record[key];
      }
    });

    if (Object.prototype.hasOwnProperty.call(next, 'estado')) {
      next.estado = Number(next.estado) === 1;
    }

    setForm(next);
    setEditingId(record.id);
  }

  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: 'Eliminar registro',
      text: 'Esta accion no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      await removeByPath(endpoint, id);
      await Swal.fire('Eliminado', 'Registro eliminado correctamente', 'success');
      loadRecords();
    } catch (error) {
      await Swal.fire('Error', error.message, 'error');
    }
  }

  return (
    <div className="d-flex flex-column gap-3">

      {/* Page header */}
      <div>
        <h1 className="fw-bold mb-1" style={{ fontSize: '1.55rem' }}>Modulo de {title}s</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--ca-muted)', marginBottom: 0 }}>
          Administra los registros de {title.toLowerCase()} del catalogo
        </p>
      </div>

      <div className="row g-4">
        {/* Form column */}
        <div className="col-12 col-lg-4">
          <div className="ca-form-panel">
            <div className="ca-form-panel-title">
              <PlusCircle size={18} color="var(--ca-primary)" />
              <span className="fw-bold" style={{ fontSize: '1rem' }}>
                {isEditing ? `Editar ${title}` : `Gestionar ${title}`}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {fields.map((field) => {
                if (field.type === 'checkbox') {
                  return (
                    <div key={field.name} className="d-flex align-items-center justify-content-between py-1">
                      <div>
                        <div className="fw-medium" style={{ fontSize: '0.875rem' }}>
                          Estado del {title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--ca-muted)' }}>
                          Habilitar en el catalogo
                        </div>
                      </div>
                      <label className="ca-toggle">
                        <input
                          type="checkbox"
                          name={field.name}
                          checked={Boolean(form[field.name])}
                          onChange={handleChange}
                        />
                        <div className="ca-toggle-track">
                          <div className="ca-toggle-thumb" />
                        </div>
                      </label>
                    </div>
                  );
                }

                if (field.type === 'textarea') {
                  return (
                    <div key={field.name}>
                      <label className="form-label">{field.label}</label>
                      <textarea
                        className="form-control"
                        name={field.name}
                        rows="3"
                        placeholder={`Descripcion del ${title.toLowerCase()}...`}
                        value={form[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                      />
                    </div>
                  );
                }

                return (
                  <div key={field.name}>
                    <label className="form-label">{field.label}</label>
                    <input
                      className="form-control"
                      type={field.type || 'text'}
                      name={field.name}
                      placeholder={`Ej. ${field.label.replace(' *', '')}`}
                      value={form[field.name] ?? ''}
                      onChange={handleChange}
                      required={field.required}
                    />
                  </div>
                );
              })}

              <div className="d-flex flex-column gap-2 mt-1">
                <button className="ca-btn-save" type="submit">
                  <Save size={15} />
                  {isEditing ? `Actualizar ${title}` : `Guardar ${title}`}
                </button>
                {isEditing && (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    onClick={resetForm}
                  >
                    Cancelar edicion
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table column */}
        <div className="col-12 col-lg-8">
          <div className="ca-table-panel">
            <div className="ca-table-header">
              <div className="d-flex align-items-center gap-2">
                <ListFilter size={17} color="var(--ca-primary)" />
                <span className="fw-bold" style={{ fontSize: '0.95rem' }}>
                  Catalogo de {title}s
                </span>
              </div>
              <button
                type="button"
                className="ca-act d-flex align-items-center gap-1"
                style={{ fontSize: '0.78rem', fontWeight: 600 }}
                onClick={loadRecords}
              >
                <RefreshCw size={13} />
                Recargar
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    {tableColumns.map((col) => (
                      <th key={col.key}>{col.header}</th>
                    ))}
                    <th style={{ width: '90px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={tableColumns.length + 2}
                        className="text-center py-4"
                        style={{ color: 'var(--ca-muted)' }}
                      >
                        Cargando...
                      </td>
                    </tr>
                  ) : records.length === 0 ? (
                    <tr>
                      <td
                        colSpan={tableColumns.length + 2}
                        className="text-center py-4"
                        style={{ color: 'var(--ca-muted)' }}
                      >
                        No hay registros
                      </td>
                    </tr>
                  ) : (
                    records.map((record) => (
                      <tr key={record.id}>
                        <td
                          className="font-monospace"
                          style={{ fontSize: '0.78rem', color: 'var(--ca-muted)' }}
                        >
                          {record.id}
                        </td>
                        {tableColumns.map((col) => (
                          <td key={col.key}>
                            {col.render
                              ? col.render(record[col.key], record)
                              : record[col.key]}
                          </td>
                        ))}
                        <td>
                          <div className="d-flex gap-1">
                            <button
                              type="button"
                              className="ca-act"
                              title="Editar"
                              onClick={() => startEdit(record)}
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              type="button"
                              className="ca-act del"
                              title="Eliminar"
                              onClick={() => handleDelete(record.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogCrudPage;
