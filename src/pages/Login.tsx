import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Store } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (role: 'comprador' | 'vendedor') => {
    if (!email || !password) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    // Simulación de login - en producción esto debería validar credenciales reales
    localStorage.setItem('userRole', role);
    toast.success(`¡Bienvenido! Ingresando como ${role}`);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Sistema de Gestión de Pedidos</h1>
          <p className="text-muted-foreground">Ingrese sus credenciales para continuar</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Comprador</CardTitle>
              <CardDescription>
                Gestiona tus pedidos y realiza seguimiento de tus compras
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-comprador">Correo Electrónico</Label>
                <Input
                  id="email-comprador"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-comprador">Contraseña</Label>
                <Input
                  id="password-comprador"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleLogin('comprador')}
              >
                Ingresar como Comprador
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-success/50 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <Store className="w-8 h-8 text-success" />
              </div>
              <CardTitle>Vendedor</CardTitle>
              <CardDescription>
                Administra tu inventario y gestiona tus ventas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-vendedor">Correo Electrónico</Label>
                <Input
                  id="email-vendedor"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-vendedor">Contraseña</Label>
                <Input
                  id="password-vendedor"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-success hover:bg-success/90" 
                onClick={() => handleLogin('vendedor')}
              >
                Ingresar como Vendedor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
