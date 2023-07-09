from todo import views
from django.urls import path, include
from django.contrib import admin
from django.urls import include, path,re_path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from todo.views import authenticate, filter_testchair, search, register, filter_showtime, get_showtime, filter_dayshowtime, filter_orderchair, filter_username, paymentticket, filter_food,posthelp, categoryRS

router = routers.DefaultRouter()
router.register(r'usernames', views.UsernameView, 'todo')
router.register(r'movies/detail', views.DetailView, 'todo')
router.register(r'movies/playing', views.MoviePlayingView, 'todo')
router.register(r'movies/coming', views.MovieSCView, 'todo')
router.register(r'foods', views.FoodView, 'todo')
router.register(r'premieres', views.PremiereView, 'todo')
router.register(r'dayshowtimes', views.DayShowtimeView, 'todo')
router.register(r'showtimes', views.ShowtimeView, 'todo')
router.register(r'ordertickets', views.OrderTicketView, 'todo')
router.register(r'questions', views.QuestionView, 'todo')
router.register(r'rating', views.RatingView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path("api/getuser/", filter_username),
    path("api/register/", register),
    path("api/authenticate/", authenticate),
    path("api/getmovie/", get_showtime),
    path("api/getshowtime/", filter_showtime),
    path("api/getdayshowtime/", filter_dayshowtime),
    path("api/orderchair/", filter_orderchair),
    path("api/postpaymentticket/", paymentticket),
    path("api/c/<int:id>", filter_food),
    path("api/testchair/", filter_testchair),
    path("api/search", search),
    path("api/postquestion/", posthelp),
    path("api/recomender/", categoryRS)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
