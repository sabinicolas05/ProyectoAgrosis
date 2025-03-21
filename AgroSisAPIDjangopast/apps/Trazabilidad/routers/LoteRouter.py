from rest_framework.routers import DefaultRouter
from ..views.LoteViews import LoteViews

LoteRouter = DefaultRouter()
LoteRouter.register(prefix='lote', viewset=LoteViews, basename='lote')