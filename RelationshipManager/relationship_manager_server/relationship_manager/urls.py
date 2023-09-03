from django.urls import path
from .views import (
    PersonListCreateView,
    PersonRetrieveUpdateDeleteView,
    RelationshipListCreateView,
    RelationshipRetrieveUpdateDeleteView,
)

urlpatterns = [
    path('api/people/', PersonListCreateView.as_view(), name='person-list-create'),
    path('api/people/<int:pk>/', PersonRetrieveUpdateDeleteView.as_view(), name='person-detail'),
    path('api/relationships/', RelationshipListCreateView.as_view(), name='relationship-list-create'),
    path('api/relationships/<uuid:pk>/', RelationshipRetrieveUpdateDeleteView.as_view(), name='relationship-detail'),
]