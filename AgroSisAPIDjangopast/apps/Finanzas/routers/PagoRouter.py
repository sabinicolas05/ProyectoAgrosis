from rest_framework.routers import DefaultRouter
from ..views.PagoViews import PagoViews
PagoRouter = DefaultRouter()

PagoRouter.register(prefix='pago',viewset=PagoViews,basename='pago')