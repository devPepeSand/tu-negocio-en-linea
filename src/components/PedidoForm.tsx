import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, FileSpreadsheet, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PedidoFormProps {
  userType: 'comprador' | 'vendedor';
}

const PedidoForm = ({ userType }: PedidoFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [tipoPedido, setTipoPedido] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [monto, setMonto] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [notas, setNotas] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const categorias = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Papelería', 'Otros'];
  const cuentas = ['Cuenta Principal', 'Cuenta Secundaria', 'Cuenta de Ahorros'];
  const metodosPago = ['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia', 'PSE'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tipoPedido || !descripcion || !categoria || !cuenta || !monto || !metodoPago) {
      toast.error('Por favor complete todos los campos obligatorios');
      return;
    }

    toast.success('Pedido registrado exitosamente');
    
    // Limpiar formulario
    setTipoPedido('');
    setDescripcion('');
    setCategoria('');
    setCuenta('');
    setMonto('');
    setMetodoPago('');
    setNotas('');
    setImagen(null);
    setDate(new Date());
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagen(file);
      toast.success('Recibo cargado correctamente');
    }
  };

  const handleCSVImport = () => {
    toast.info('Función de importación CSV próximamente');
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, '');
    return number ? `$${parseInt(number).toLocaleString('es-CO')}` : '';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Registro de {userType === 'comprador' ? 'Compra' : 'Venta'}</CardTitle>
          <CardDescription>
            Complete los datos del {userType === 'comprador' ? 'pedido' : 'registro de venta'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tipo-pedido">Tipo de {userType === 'comprador' ? 'Pedido' : 'Venta'} *</Label>
                <Input
                  id="tipo-pedido"
                  placeholder={userType === 'comprador' ? 'Ej: Compra de materiales' : 'Ej: Venta mayorista'}
                  value={tipoPedido}
                  onChange={(e) => setTipoPedido(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select value={categoria} onValueChange={setCategoria} required>
                  <SelectTrigger id="categoria">
                    <SelectValue placeholder="Seleccione una categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {categorias.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descripcion">Descripción *</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describa los detalles del pedido..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuenta">Cuenta *</Label>
                <Select value={cuenta} onValueChange={setCuenta} required>
                  <SelectTrigger id="cuenta">
                    <SelectValue placeholder="Seleccione una cuenta" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {cuentas.map((cta) => (
                      <SelectItem key={cta} value={cta}>
                        {cta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP', { locale: es }) : <span>Seleccione una fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monto">Monto ($) *</Label>
                <Input
                  id="monto"
                  type="text"
                  placeholder="$0"
                  value={formatCurrency(monto)}
                  onChange={(e) => setMonto(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metodo-pago">Método de Pago *</Label>
                <Select value={metodoPago} onValueChange={setMetodoPago} required>
                  <SelectTrigger id="metodo-pago">
                    <SelectValue placeholder="Seleccione un método" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {metodosPago.map((metodo) => (
                      <SelectItem key={metodo} value={metodo}>
                        {metodo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notas">Notas (Opcional)</Label>
                <Textarea
                  id="notas"
                  placeholder="Agregue notas adicionales..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="recibo">Cargar Recibo (Opcional)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="recibo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('recibo')?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {imagen ? imagen.name : 'Seleccionar imagen'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Registrar {userType === 'comprador' ? 'Pedido' : 'Venta'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Importación Masiva</CardTitle>
          <CardDescription>
            Importe múltiples transacciones desde un archivo CSV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleCSVImport} variant="outline" className="w-full">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Importar desde CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PedidoForm;
