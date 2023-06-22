from django.contrib import admin
from .models import Username, Movie, Food, Premiere, DayShowtime, Showtime, OrderTicket, Question, MyList, MyRating


class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'password', 'phone', 'birthday')

# Register your models here.


admin.site.register(Username, UserAdmin)
admin.site.register(Movie)
admin.site.register(MyRating)
admin.site.register(MyList)
admin.site.register(Showtime)
admin.site.register(Premiere)
admin.site.register(DayShowtime)
admin.site.register(OrderTicket)
admin.site.register(Food)
admin.site.register(Question)
