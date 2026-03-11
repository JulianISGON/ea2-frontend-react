import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { PlusCircle, Save, Grid, Edit2, Trash2, RefreshCw, Info, Share2, Image as ImageIcon } from 'lucide-react';
import { createByPath, listByPath, removeByPath, updateByPath } from '../api/catalogApi';

const initialForm = {
  serial: '',
  titulo: '',
  sinopsis: '',
  url: '',
  imagen_portada: '',
  anio_estreno: '',
  genero_id: '',
  director_id: '',
  productora_id: '',
  tipo_id: '',
};

function MediaCrudPage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  async function loadCatalogs() {
    try {
      const [g, d, p, t] = await Promise.all([
        listByPath('/generos'),
        listByPath('/directores'),
        listByPath('/productoras'),
        listByPath('/tipos'),
      ]);
      setGeneros(g.filter((item) => Number(item.estado) === 1));
      setDirectores(d.filter((item) => Number(item.estado) === 1));
      setProductoras(p.filter((item) => Number(item.estado) === 1));
      setTipos(t);
    } catch (error) {
      await Swal.fire('Error', error.message, 'error');
    }
  }

  async function loadRecords() {
    setLoading(true);
    try {
      const rows = await listByPath('/media');
      setRecords(rows);
    } catch (error) {
      await Swal.fire('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCatalogs();
    loadRecords();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function startEdit(record) {
    setEditingId(record.id);
    setForm({
      serial: record.serial || '',
      titulo: record.titulo || '',
      sinopsis: record.sinopsis || '',
      url: record.url || '',
      imagen_portada: record.imagen_portada || '',
      anio_estreno: record.anio_estreno || '',
      genero_id: String(record.genero_id || ''),
      director_id: String(record.director_id || ''),
      productora_id: String(record.productora_id || ''),
      tipo_id: String(record.tipo_id || ''),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      ...form,
      anio_estreno: form.anio_estreno ? Number(form.anio_estreno) : null,
      genero_id: Number(form.genero_id),
      director_id: Number(form.director_id),
      productora_id: Number(form.productora_id),
      tipo_id: Number(form.tipo_id),
    };

    try {
      if (editingId) {
        await updateByPath('/media', editingId, payload);
        await Swal.fire('Listo', 'Media actualizada correctamente', 'success');
      } else {
        await createByPath('/media', payload);
        await Swal.fire('Listo', 'Media creada correctamente', 'success');
      }
      resetForm();
      loadRecords();
    } catch (error) {
      await Swal.fire('Error', error.message, 'error');
    }
  }

  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: 'Eliminar media',
      text: 'Esta accion no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;
    try {
      await removeByPath('/media', id);
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
        <h1 className="fw-bold mb-1" style={{ fontSize: '1.55rem' }}>Gestion Multimedia</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--ca-muted)', marginBottom: 0 }}>
          Administra el catalogo de contenido, directores y relaciones de produccion.
        </p>
      </div>

      <div className="row g-4">
        {/* Form column */}
        <div className="col-12 col-xl-4">
          <div className="ca-form-panel">
            <div className="ca-form-panel-title">
              <PlusCircle size={18} color="var(--ca-primary)" />
              <span className="fw-bold" style={{ fontSize: '1rem' }}>
                {editingId ? 'Editar Media' : 'Anadir Media'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

              {/* Basic info section */}
              <div className="ca-form-section">
                <Info size={13} />
                Informacion Basica
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Serial *</label>
                  <input className="form-control" name="serial" placeholder="CA-10023" value={form.serial} onChange={handleChange} required />
                </div>
                <div className="col-6">
                  <label className="form-label">Anio Estreno</label>
                  <input className="form-control" type="number" name="anio_estreno" placeholder="2024" value={form.anio_estreno} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="form-label">Titulo *</label>
                <input className="form-control" name="titulo" placeholder="Ej: Inception" value={form.titulo} onChange={handleChange} required />
              </div>

              <div>
                <label className="form-label">Sinopsis</label>
                <textarea className="form-control" rows="3" name="sinopsis" placeholder="Breve descripcion de la trama..." value={form.sinopsis} onChange={handleChange} />
              </div>

              {/* Relations section */}
              <div className="ca-form-section">
                <Share2 size={13} />
                Relaciones
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Genero *</label>
                  <select className="form-select" name="genero_id" value={form.genero_id} onChange={handleChange} required>
                    <option value="">Selecciona...</option>
                    {generos.map((item) => (
                      <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label">Tipo *</label>
                  <select className="form-select" name="tipo_id" value={form.tipo_id} onChange={handleChange} required>
                    <option value="">Selecciona...</option>
                    {tipos.map((item) => (
                      <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label">Director *</label>
                  <select className="form-select" name="director_id" value={form.director_id} onChange={handleChange} required>
                    <option value="">Selecciona...</option>
                    {directores.map((item) => (
                      <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label">Productora *</label>
                  <select className="form-select" name="productora_id" value={form.productora_id} onChange={handleChange} required>
                    <option value="">Selecciona...</option>
                    {productoras.map((item) => (
                      <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Multimedia section */}
              <div className="ca-form-section">
                <ImageIcon size={13} />
                Multimedia
              </div>

              <div>
                <label className="form-label">URL *</label>
                <input className="form-control" name="url" placeholder="https://example.com/video" value={form.url} onChange={handleChange} required />
              </div>

              <div>
                <label className="form-label">Imagen Portada</label>
                <input className="form-control" name="imagen_portada" placeholder="https://example.com/poster.jpg" value={form.imagen_portada} onChange={handleChange} />
              </div>

              <div className="d-flex flex-column gap-2 mt-1">
                <button className="ca-btn-save" type="submit">
                  <Save size={15} />
                  {editingId ? 'Actualizar Media' : 'Registrar Media'}
                </button>
                {editingId && (
                  <button className="btn btn-outline-secondary btn-sm" type="button" onClick={resetForm}>
                    Cancelar edicion
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table column */}
        <div className="col-12 col-xl-8">
          <div className="ca-table-panel" style={{ height: '100%' }}>
            <div className="ca-table-header">
              <div className="d-flex align-items-center gap-2">
                <Grid size={17} color="var(--ca-primary)" />
                <span className="fw-bold" style={{ fontSize: '0.95rem' }}>Catalogo Multimedia</span>
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
                    <th>Contenido</th>
                    <th>Ano</th>
                    <th>Tipo</th>
                    <th>Genero</th>
                    <th>Director</th>
                    <th>Productora</th>
                    <th style={{ width: '80px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4" style={{ color: 'var(--ca-muted)' }}>
                        Cargando...
                      </td>
                    </tr>
                  ) : records.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4" style={{ color: 'var(--ca-muted)' }}>
                        No hay datos para mostrar
                      </td>
                    </tr>
                  ) : (
                    records.map((record) => (
                      <tr key={record.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div className="ca-cover">
                              {record.imagen_portada ? (
                                <img src={record.imagen_portada} alt={record.titulo} referrerPolicy="no-referrer" />
                              ) : (
                                <ImageIcon size={14} />
                              )}
                            </div>
                            <div>
                              <div className="fw-semibold" style={{ fontSize: '0.85rem' }}>{record.titulo}</div>
                              <div className="font-monospace" style={{ fontSize: '0.72rem', color: 'var(--ca-muted)' }}>{record.serial}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontSize: '0.85rem' }}>{record.anio_estreno || '—'}</td>
                        <td>
                          {record.tipo ? (
                            <span className="ca-tag">{record.tipo}</span>
                          ) : '—'}
                        </td>
                        <td style={{ fontSize: '0.85rem' }}>{record.genero_principal || '—'}</td>
                        <td style={{ fontSize: '0.85rem' }}>{record.director_principal || '—'}</td>
                        <td style={{ fontSize: '0.85rem' }}>{record.productora || '—'}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button type="button" className="ca-act" title="Editar" onClick={() => startEdit(record)}>
                              <Edit2 size={14} />
                            </button>
                            <button type="button" className="ca-act del" title="Eliminar" onClick={() => handleDelete(record.id)}>
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

export default MediaCrudPage;