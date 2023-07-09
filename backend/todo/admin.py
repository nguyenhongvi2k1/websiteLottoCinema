from django.contrib import admin
from .models import Username, Movie, Food, Premiere, DayShowtime, Showtime, OrderTicket, Question, MyRating


class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'password', 'phone', 'birthday')

# Register your models here.
admin.site.register(Username, UserAdmin)
# class UsernameAdmin(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email', 'password', 'phone', 'birthday')

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'poster', 'trailer',
                  'category', 'director', 'actor', 'date_premiere', 'content')
    
@admin.register(MyRating)
class MyRatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_user', 'id_movie', 'rating', 'timestamp')

@admin.register(Showtime)
class ShowtimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'fk_dayshowtimes', 'fk_movie')

@admin.register(Premiere)
class PremiereAdmin(admin.ModelAdmin):
    list_display = ('id', 'time')

@admin.register(DayShowtime)
class DayShowtimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'day_showtime', 'fk_showtime')

@admin.register(OrderTicket)
class OrderTicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'fk_username', 'fk_movie',
                  'fk_food', 'fk_dayshowtime', 'fk_time', 'quantity_ticket', 'chair', 'summary')

@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'quantile_food','sum_food')

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'fk_username', 'text_help', 'answer')

