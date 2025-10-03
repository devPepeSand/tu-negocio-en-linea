import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Store, BarChart3, TrendingUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Sistema de Gestión de Pedidos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plataforma completa para gestionar pedidos, inventario y ventas de manera eficiente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-card rounded-lg p-8 border-2 border-primary/20 hover:border-primary/50 transition-all">
            <ShoppingCart className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-3">Para Compradores</h2>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Visualización de pedidos y estadísticas
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Seguimiento de actividad en tiempo real
              </li>
              <li className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
                Control completo de inventario
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-8 border-2 border-success/20 hover:border-success/50 transition-all">
            <Store className="w-16 h-16 text-success mb-4" />
            <h2 className="text-2xl font-bold mb-3">Para Vendedores</h2>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-success" />
                Dashboard completo de ventas
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                Análisis de rendimiento y ganancias
              </li>
              <li className="flex items-center gap-2">
                <Store className="w-4 h-4 text-success" />
                Gestión integral de inventario
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/login')}
          >
            Ingresar al Sistema
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-sm text-muted-foreground">En Español</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">$COP</div>
            <p className="text-sm text-muted-foreground">Pesos Colombianos</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-sm text-muted-foreground">Disponibilidad</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">∞</div>
            <p className="text-sm text-muted-foreground">Pedidos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
