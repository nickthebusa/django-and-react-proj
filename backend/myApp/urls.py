from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers


from . import views


router = routers.DefaultRouter()
router.register(r'hyper-user-list', views.HyperViewSet)
router.register(r'hyper-user-detail', views.HyperViewDetail)


urlpatterns = [
    path('', views.apiRoutes, name='apiRoutes'),
    path('thing-list/', views.thingList, name="thing-list"),
    path('thing-detail/<str:pk>', views.thingDetail, name="thing-detail"),
    path('thing-create', views.thingCreate, name="thing-create"),
    path('thing-update/<str:pk>', views.thingUpdate, name="thing-update"),
    path('thing-delete/<str:pk>', views.thingDelete, name="thing-delete"),
    path('song-create', views.songCreate, name="song-create"),
    path('song-list/', views.songList, name="song-list"),
    path('', include(router.urls))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
