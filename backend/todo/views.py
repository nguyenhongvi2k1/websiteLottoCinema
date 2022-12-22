import datetime
from rest_framework import viewsets
from django.shortcuts import render
from rest_framework.response import Response
from .serializers import UsernameSerializer, MovieSerializer, FoodSerializer, PremiereSerializer, DayShowtimeSerializer, ShowtimeSerializer, OrderTicketSerializer, QuestionSerializer
from .models import Username, Movie, Food, Premiere, DayShowtime, Showtime, OrderTicket, Question
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view
from django.utils import timezone
from datetime import date
from django.db.models import Q


@api_view(["POST"])
def register(request):
    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")
    phone = request.data.get("phone")
    birthday = request.data.get("birthday")
    user = Username(name=name, email=email, password=password, phone=phone, birthday=birthday)
    user.save()
    return Response(status=201)


@api_view(["POST"])
def authenticate(request):
    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")
    user = Username(name=name, email=email, password=password)
    return Response(UsernameSerializer(user).data, status=200)

@api_view(["GET"])
def filter_username(request):
    email = request.GET.get("email")
    user = Username.objects.filter(email=email)
    return Response(UsernameSerializer(user, many=True).data, status=200)

@api_view(["GET"])
def get_showtime(request, id=None):
    showtime = Showtime.objects.all()
    return Response(ShowtimeSerializer(showtime, many=True).data, status=200)

@api_view(["GET"])
def filter_showtime(request):
    fk_movie = request.GET.get("fk_movie")
    showtime = Showtime.objects.filter(fk_movie=fk_movie)
    return Response(ShowtimeSerializer(showtime, many=True).data, status=200)

# @api_view(["GET"])
# def filter_chooseuser(request):
#     fk_movie = request.GET.get("id_movie")
#     fk_dayshowtime = request.GET.get("id_dayshowtime")
#     fk_time = request.GET.get("id_time")
#     showtime = Showtime.objects.filter(fk_movie=fk_movie, fk_dayshowtime=fk_dayshowtime, fk_time=fk_time)
#     return Response(ShowtimeSerializer(showtime, many=True).data, status=200)

@api_view(["GET"])
def filter_dayshowtime(request):
    fk_movie = request.GET.get("fk_movie")
    fk_dayshowtime = request.GET.get("fk_dayshowtime")
    showtime = Showtime.objects.filter(fk_movie=fk_movie, fk_dayshowtimes=fk_dayshowtime)
    return Response(ShowtimeSerializer(showtime, many=True).data, status=200)

@api_view(["GET"])
def filter_orderchair(request):
    id_movie = request.GET.get("id_movie")
    id_dayshowtime = request.GET.get("id_dayshowtime")
    id_time = request.GET.get("id_time")
    showtime = Showtime.objects.filter(fk_movie=id_movie, fk_dayshowtimes=id_dayshowtime)
    time = DayShowtime.objects.filter(fk_showtime=id_time, pk=id_dayshowtime)
    return Response( DayShowtimeSerializer(time, many=True).data and ShowtimeSerializer(showtime, many=True).data, status=200)

@api_view(["GET"])
def filter_testchair(request):
    fk_movie = request.GET.get("id_movie")
    fk_dayshowtime = request.GET.get("id_dayshowtime")
    fk_time = request.GET.get("id_time")
    chair = OrderTicket.objects.filter( fk_movie=fk_movie, fk_dayshowtime=fk_dayshowtime, fk_time=fk_time )
    response =  Response( OrderTicketSerializer(chair, many = True).data , status=200)
    return response
    
@api_view(["POST"])
def paymentticket(request):
    id_username = request.data.get("id_user")
    id_movie = request.data.get("id_movie")
    id_food = request.data.get("id_food")
    id_dayshowtime = request.data.get("id_dayshowtime")
    id_time = request.data.get("id_time")
    quantity_ticket = request.data.get("quantity_ticket")
    chair = request.data.get("chair")
    summary = request.data.get("summary")
    fk_username = Username.objects.get(pk=id_username)
    fk_movie = Movie.objects.get(pk=id_movie)
    fk_food = Food.objects.get(pk=id_food)
    fk_dayshowtime = DayShowtime.objects.get(pk=id_dayshowtime)
    fk_time = Premiere.objects.get(pk=id_time)
    order = OrderTicket(fk_username=fk_username, fk_movie=fk_movie, fk_food=fk_food, 
                    fk_dayshowtime=fk_dayshowtime, fk_time=fk_time, 
                    quantity_ticket=quantity_ticket, chair=chair, summary=summary)
    order.save()
    return Response(status=200)


    
@api_view(["POST"])
def posthelp(request):
    id_username = request.data.get("id_user")
    text_help = request.data.get("text_help")
    answer = " "
    fk_username = Username.objects.get(pk=id_username)
    help = Question(fk_username=fk_username,  text_help=text_help, answer=answer)
    help.save()
    return Response(status=200)



@api_view(["GET"])
def filter_food(request,  id=None):
    food = Food.objects.get(pk=id)
    return Response(FoodSerializer(food).data, status=200)

@api_view(["GET"])
def search(request):
    question = request.GET.get("q")
    query = Movie.objects.filter( Q(title__icontains=question)|Q(category__icontains=question)|Q(director__icontains=question)|Q(actor__icontains=question)|Q(content__icontains=question))
    return Response(MovieSerializer(query,  many = True).data, status=200)

class DetailView(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MoviePlayingView(viewsets.ModelViewSet):
    queryset = Movie.objects.exclude(date_premiere__gte=date.today())
    serializer_class = MovieSerializer

class MovieSCView(viewsets.ModelViewSet):
    queryset = Movie.objects.exclude(date_premiere__lt=date.today())
    serializer_class = MovieSerializer

class FoodView(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer


class PremiereView(viewsets.ModelViewSet):
    queryset = Premiere.objects.all()
    serializer_class = PremiereSerializer


class UsernameView(viewsets.ModelViewSet):
    queryset = Username.objects.all()
    serializer_class = UsernameSerializer

class DayShowtimeView(viewsets.ModelViewSet):
    queryset = DayShowtime.objects.all()
    serializer_class = DayShowtimeSerializer


class ShowtimeView(viewsets.ModelViewSet):
    queryset = Showtime.objects.all()
    serializer_class = ShowtimeSerializer


class OrderTicketView(viewsets.ModelViewSet):
    queryset = OrderTicket.objects.all()
    serializer_class = OrderTicketSerializer

class QuestionView(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
