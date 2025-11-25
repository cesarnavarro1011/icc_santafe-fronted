"use client";

import * as React from "react";
import axios from "@/lib/axios";
import { toast } from "sonner";
import CalendarManualForm from "@/components/CalendarManualForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Item = {
  id: string;
  anio: number;
  tipo: string;
  digitoDesde: number | null;
  digitoHasta: number | null;
  fecha: string;
};

export default function AdminCalendarPage() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [editing, setEditing] = React.useState<Item | null>(null);

  const load = React.useCallback(async () => {
    const { data } = await axios.get("/dian");

    // Normalizar según distintas formas de respuesta del backend
    const raw = Array.isArray(data) ? data : (data.items ?? data.data ?? []);
    const normalized: Item[] = (raw || []).map((r: any) => ({
      id: r.id,
      anio: r.anio ?? r.anioGravable,
      tipo: r.tipo ?? r.tipoImpuesto,
      digitoDesde: r.digitoDesde ?? null,
      digitoHasta: r.digitoHasta ?? null,
      fecha: (r.fecha ?? r.fechaVencimiento ?? "").toString().substring(0, 10),
    }));

    setItems(normalized);
  }, []);

  React.useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener("dian:refresh", handler as any);
    return () => window.removeEventListener("dian:refresh", handler as any);
  }, [load]);

  const onDelete = async (id: string) => {
    await axios.delete(`/dian/${id}`);
    toast.success("Eliminado");
    load();
  };

  const onSaveEdit = async () => {
    if (!editing) return;
    try {
      const { id } = editing;
      const payload = {
        anioGravable: editing.anio,
        tipoImpuesto: editing.tipo,
        digitoDesde: editing.digitoDesde,
        digitoHasta: editing.digitoHasta,
        fechaVencimiento: editing.fecha,
      };
      await axios.put(`/dian/${id}`, payload);
      toast.success("Actualizado");
      setEditing(null);
      load();
    } catch (e: any) {
      toast.error(e?.response?.data?.error || "Error al actualizar");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Administrar calendario tributario</h1>
      <CalendarManualForm />

      <Card>
        <CardHeader>
          <CardTitle>Registros existentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Año</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Rango dígitos</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.anio}</TableCell>
                  <TableCell>{r.tipo}</TableCell>
                  <TableCell>{r.digitoDesde == null ? "—" : `${r.digitoDesde}-${r.digitoHasta}`}</TableCell>
                  <TableCell>{r.fecha}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="outline" onClick={() => setEditing(r)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => onDelete(r.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Sin registros
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar registro</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="grid gap-3">
              <div>
                <Label>Año</Label>
                <Input
                  type="number"
                  value={editing.anio}
                  onChange={(e) => setEditing({ ...editing, anio: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Tipo</Label>
                <Input value={editing.tipo} onChange={(e) => setEditing({ ...editing, tipo: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Desde</Label>
                  <Input
                    type="number"
                    min={0}
                    max={9}
                    value={editing.digitoDesde ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, digitoDesde: e.target.value === "" ? null : Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label>Hasta</Label>
                  <Input
                    type="number"
                    min={0}
                    max={9}
                    value={editing.digitoHasta ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, digitoHasta: e.target.value === "" ? null : Number(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Fecha (YYYY-MM-DD)</Label>
                <Input
                  value={editing.fecha}
                  onChange={(e) => setEditing({ ...editing, fecha: e.target.value })}
                  placeholder="2025-09-15"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={onSaveEdit}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}