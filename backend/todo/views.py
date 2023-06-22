# from turtle import pd
from audioop import avg
from django.http import Http404
from rest_framework.response import Response
from rest_framework import viewsets,status, generics
from django.shortcuts import redirect, render
from rest_framework.response import Response
from .serializers import RatingSerializer, UsernameSerializer, MovieSerializer, FoodSerializer, PremiereSerializer, DayShowtimeSerializer, ShowtimeSerializer, OrderTicketSerializer, QuestionSerializer
from .models import MyRating, Username, Movie, Food, Premiere, DayShowtime, Showtime, OrderTicket, Question
from rest_framework.decorators import api_view
from datetime import date
from django.db.models import Q
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.db.models import Case, When


# Sign Up
@api_view(["POST"])
def register(request):
    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")
    phone = request.data.get("phone")
    birthday = request.data.get("birthday")
    if Username.objects.filter(email=email).exists():
        return Response("Item already exists", status.HTTP_400_BAD_REQUEST)
    else:
        user = Username(name=name, email=email, password=password, phone=phone, birthday=birthday)
        user.save()
        return Response(status=201)

# Sign In
@api_view(["POST"])
def authenticate(request):
    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")
    user = Username(name=name, email=email, password=password)
    serializer = UsernameSerializer(user).data
    if user is not None:
        if Username.objects.filter(email=email, password=password).exists():
            return Response(UsernameSerializer(user).data, status=200)
        else:
            return Response({'Your account disable'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, {'Invalid Login'}, status=status.HTTP_404_NOT_FOUND)
    # return Response(UsernameSerializer(user).data, status=200)

# show all info user filter = email, choose chair
@api_view(["GET"])
def filter_username(request):
    email = request.GET.get("email")
    user = Username.objects.filter(email=email)
    return Response(UsernameSerializer(user, many=True).data, status=200)

# show all showtime
@api_view(["GET"])
def get_showtime(request, id=None):
    showtime = Showtime.objects.all()
    return Response(ShowtimeSerializer(showtime, many=True).data, status=200)

# show all info, choose day, buy ticket component
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

# show all info, choose time, buy ticket component
@api_view(["GET"])
def filter_dayshowtime(request):
    fk_movie = request.GET.get("fk_movie")
    fk_dayshowtime = request.GET.get("fk_dayshowtime")
    showtime = Showtime.objects.filter(fk_movie=fk_movie, fk_dayshowtimes=fk_dayshowtime)
    return Response(ShowtimeSerializer(showtime, many=True).data, status=200)

# show info, choose chair => temple choose user
@api_view(["GET"])
def filter_orderchair(request):
    id_movie = request.GET.get("id_movie")
    id_dayshowtime = request.GET.get("id_dayshowtime")
    id_time = request.GET.get("id_time")
    showtime = Showtime.objects.filter(fk_movie=id_movie, fk_dayshowtimes=id_dayshowtime)
    time = DayShowtime.objects.filter(fk_showtime=id_time, pk=id_dayshowtime)
    return Response( DayShowtimeSerializer(time, many=True).data and ShowtimeSerializer(showtime, many=True).data, status=200)

# test chair empty
@api_view(["GET"])
def filter_testchair(request):
    fk_movie = request.GET.get("id_movie")
    fk_dayshowtime = request.GET.get("id_dayshowtime")
    fk_time = request.GET.get("id_time")
    chair = OrderTicket.objects.filter( fk_movie=fk_movie, fk_dayshowtime=fk_dayshowtime, fk_time=fk_time )
    response =  Response( OrderTicketSerializer(chair, many = True).data , status=200)
    return response
    

# payment
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


class RatingList(generics.ListCreateAPIView):
    queryset = MyRating.objects.all()
    serializer_class = RatingSerializer


class RecommendationList(generics.ListAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        user = Username.objects.get(id=user_id)
        rated_movies = MyRating.objects.filter(id_user=user).values_list('movie', flat=True)
        unrated_movies = Movie.objects.exclude(id__in=rated_movies)
        recommended_movies = []
        for movie in unrated_movies:
            ratings = MyRating.objects.filter(id_movie=movie).exclude(id_user=user)
            if ratings:
                avg_rating = ratings.aggregate(avg('rating'))['rating__avg']
                recommended_movies.append((movie, avg_rating))
        recommended_movies = sorted(recommended_movies, key=lambda x: x[1], reverse=True)[:10]
        return [movie for movie, rating in recommended_movies]



# class RecommendationList(generics.ListAPIView):
#     serializer_class = MovieSerializer

#     def get_queryset(self):
#         user_id = self.request.query_params.get('user_id')
#         user_ratings = Rating.objects.filter(user_id=user_id)
#         user_movies = set(user_ratings.values_list('movie_id', flat=True))

#         ratings = Rating.objects.exclude(user_id=user_id).values('user_id', 'movie_id', 'rating')
#         other_users_ratings = {}
#         for r in ratings:
#             if r['user_id'] not in other_users_ratings:
#                 other_users_ratings[r['user_id']] = {}
#             other_users_ratings[r['user_id']][r['movie_id']] = r['rating']

#         recommendations = {}
#         for movie_id in set(Rating.objects.values_list('movie_id', flat=True)):
#             if movie_id not in user_movies:
#                 rating_sum = 0
#                 rating_count = 0
#                 for user in other_users_ratings:
#                     if movie_id

# Recommendation Algorithm
# def recommend(request):

#     movie_rating=pd.DataFrame(list(MyRating.objects.all().values()))

#     new_user=movie_rating.user_id.unique().shape[0]
#     current_user_id= request.user.id
# 	# if new user not rated any movie
#     if current_user_id>new_user:
#         movie=Movie.objects.get(id=19)
#         q=MyRating(user=request.user,movie=movie,rating=0)
#         q.save()


#     userRatings = movie_rating.pivot_table(index=['user_id'],columns=['movie_id'],values='rating')
#     userRatings = userRatings.fillna(0,axis=1)
#     corrMatrix = userRatings.corr(method='pearson')

#     user = pd.DataFrame(list(MyRating.objects.filter(user=request.user).values())).drop(['user_id','id'],axis=1)
#     user_filtered = [tuple(x) for x in user.values]
#     movie_id_watched = [each[0] for each in user_filtered]

#     similar_movies = pd.DataFrame()
#     for movie,rating in user_filtered:
#         similar_movies = similar_movies.append(get_similar(movie,rating,corrMatrix),ignore_index = True)

#     movies_id = list(similar_movies.sum().sort_values(ascending=False).index)
#     movies_id_recommend = [each for each in movies_id if each not in movie_id_watched]
#     preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(movies_id_recommend)])
#     movie_list=list(Movie.objects.filter(id__in = movies_id_recommend).order_by(preserved)[:10])

#     context = {'movie_list': movie_list}
#     return render(request, 'recommend/recommend.html', context)



# import csv
# from datetime import datetime
# from django.core.management.base import BaseCommand
# from myapp.models import Movie, Genre, User, Rating

# class Command(BaseCommand):
#     help = 'Import MovieLens dataset into Django models'

#     def handle(self, *args, **options):
#         # Import movies
#         with open('path/to/movies.csv', 'r') as file:
#             reader = csv.reader(file)
#             next(reader)  # Skip header
#             for row in reader:
#                 movie_id = row[0]
#                 title = row[1]
#                 genres = row[2].split('|')
#                 movie = Movie.objects.create(id=movie_id, title=title)
#                 for genre_name in genres:
#                     genre, _ = Genre.objects.get_or_create(name=genre_name)
#                     movie.genres.add(genre)

#         # Import ratings
#         with open('path/to/ratings.csv', 'r') as file:
#             reader = csv.reader(file)
#             next(reader)  # Skip header
#             for row in reader:
#                 user_id = row[0]
#                 movie_id = row[1]
#                 rating = row[2]
#                 timestamp = datetime.fromtimestamp(int(row[3]))
#                 user, _ = User.objects.get_or_create(id=user_id)
#                 movie = Movie.objects.get(id=movie_id)
#                 Rating.objects.create(user=user, movie=movie, rating=rating, timestamp=timestamp)

#         self.stdout.write(self.style.SUCCESS('MovieLens dataset imported successfully.'))
