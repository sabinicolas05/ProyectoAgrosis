from rest_framework.routers import DefaultRouter
from ..views.ResiduoViews import ResiduoViews
ResiduoRouter = DefaultRouter()

ResiduoRouter.register(prefix='residuo',viewset=ResiduoViews,basename='residuo')