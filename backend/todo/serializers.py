from .models import Username, Movie, Food, Premiere, DayShowtime, Showtime, OrderTicket, Question
from rest_framework import serializers
from django.utils import timezone

class UsernameSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Username
        fields = ['id', 'name', 'email', 'password', 'phone', 'birthday']


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster', 'trailer',
                  'category', 'director', 'actor', 'date_premiere', 'content']


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'price', 'quantile_food','sum_food']


class PremiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Premiere
        fields = ['id', 'time']


class DayShowtimeSerializer(serializers.ModelSerializer):
    fk_showtime = PremiereSerializer()
    class Meta:
        model = DayShowtime
        fields = ['id', 'day_showtime', 'fk_showtime']


class ShowtimeSerializer(serializers.ModelSerializer):
    fk_dayshowtimes = DayShowtimeSerializer()
    fk_movie = MovieSerializer()
    class Meta:
        model = Showtime
        fields = ['id', 'fk_dayshowtimes', 'fk_movie']


class OrderTicketSerializer(serializers.ModelSerializer):
    fk_username = UsernameSerializer()
    fk_movie = MovieSerializer()
    fk_food = FoodSerializer()
    fk_dayshowtime = DayShowtimeSerializer()
    fk_time = PremiereSerializer()
    class Meta:
        model = OrderTicket
        fields = ['id', 'fk_username', 'fk_movie',
                  'fk_food', 'fk_dayshowtime', 'fk_time', 'quantity_ticket', 'chair', 'summary']

class QuestionSerializer(serializers.ModelSerializer):
    fk_username = UsernameSerializer()
    class Meta:
        model = Question
        fields = ['id', 'fk_username', 'text_help', 'answer']

