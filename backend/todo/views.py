# from turtle import pd
from math import ceil, sqrt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
import pandas as pd
import numpy as np
from audioop import avg
from django.http import Http404
from rest_framework.response import Response
from django.http import HttpResponse
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
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse





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
    showtime = Showtime.objects.exclude(day_showtime__gte=date.today())
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
    fk_dayshowtime = DayShowtime.objects.get(pk=id_dayshowtime)
    fk_time = Premiere.objects.get(pk=id_time)
    if not id_food:
        order = OrderTicket(fk_username=fk_username, fk_movie=fk_movie,
                        fk_dayshowtime=fk_dayshowtime, fk_time=fk_time, 
                        quantity_ticket=quantity_ticket, chair=chair, summary=summary)
        order.save()
    else:
        fk_food = Food.objects.get(pk=id_food)
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
    queryset = Movie.objects.exclude(date_premiere__gte=date.today()).filter(date_premiere__gte=date(2010, 1, 30))
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


class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer

# @api_view(["GET"])
def categoryRS(request):
    movie = Movie.objects.all()
    rating = MyRating.objects.all()
    x = []
    y = []
    A = []
    B = []
    C = []
    D = []
    for i in movie:
        x = [i.id, i.title, i.poster, i.trailer, i.category, i.actor, i.director, i.date_premiere, i.content]
        y +=[x]
    movie_df = pd.DataFrame(y, columns=['movieId', 'title', 'poster', 'trailer', 'category', 'actor', 'director', 'date_premiere', 'content'])
    # print("Movie DataFrame")
    for item in rating:
        A = [item.id_user.id, item.id_movie.id, item.rating]
        B += [A]
    rating_df = pd.DataFrame(B, columns = ['userId', 'movieId', 'rating'])
    # print("Rating DataFrame")
    rating_df['userId'] = rating_df["userId"].astype(str).astype(np.int64)
    rating_df['movieId'] = rating_df["movieId"].astype(str).astype(np.int64)
    rating_df['rating'] = rating_df["rating"].astype(str).astype(np.int64)
    # print(rating_df.dtypes)
    userId = request.GET.get("id_user")
    if userId:
        userInput = MyRating.objects.select_related('id_movie').filter(id_user = userId)
        if userInput.count() == 0:
            recommenderQuery = None
            userInput = None
        else:
            for item in userInput:
                C = [item.id_movie.title, item.rating]
                D += [C]
            inputMovies = pd.DataFrame(D, columns=['title', 'rating'])
            # print("Watched Movie bt user DataFrame")
            inputMovies['rating'] = inputMovies["rating"].astype(str).astype(np.int64)
            # print(inputMovies.dtypes)

            inputId = movie_df[movie_df['title'].isin(inputMovies['title'].tolist())]
            inputMovies = pd.merge(inputId, inputMovies)
            # print(inputMovies)

            userSebset = rating_df[rating_df['movieId'].isin(inputMovies['movieId'].tolist())]
            userSebsetGroup = userSebset.groupby(['userId'])
            userSebsetGroup = sorted(userSebsetGroup, key= lambda x: len(x[1]), reverse=True)

            # print(userSebsetGroup[0:])

            userSebsetGroup = userSebsetGroup[0:]

            pearsonCorrelationDict = {}

            for name, group in userSebsetGroup:
                group = group.sort_values(by='movieId')
                inputMovies = inputMovies.sort_values(by='movieId')
                nRating = len(group)
                temp_df = inputMovies[inputMovies['movieId'].isin(inputMovies['movieId'].tolist())]
                tempRatingList = temp_df['rating'].tolist()
                tempGroupList = group['rating'].tolist()

                Sxx = sum([i ** 2 for i in tempRatingList]) - pow(sum(tempRatingList),2)/float(nRating)
                Syy = sum([i ** 2 for i in tempGroupList]) - pow(sum(tempGroupList),2)/float(nRating)
                Sxy = sum(i*j for i,j in zip(tempRatingList, tempGroupList)) - sum(tempRatingList)*sum(tempGroupList)/float(nRating)

                if Sxx !=0 and Syy != 0:
                    pearsonCorrelationDict[name[0]] = Sxy/sqrt(abs(Sxx*Syy))                    
                else:
                    pearsonCorrelationDict[name[0]] = 0
            # print("pearsonCorrelationDict: ",pearsonCorrelationDict.items())

            pearsonDF = pd.DataFrame.from_dict(pearsonCorrelationDict, orient= 'index')
            # print( pearsonDF.index)
            pearsonDF.columns = ['similarityIndex']
            pearsonDF['userId'] = pearsonDF.index
            pearsonDF.index = range(len(pearsonDF))
            # print("pearsonDF: ", pearsonDF)
            topUsers = pearsonDF.sort_values(by='similarityIndex', ascending=False)[0:]
            # print("topUsers: ",  topUsers['userId'])
            # print("rating_df: ",  rating_df['userId'])
            #inner join in python pandas
            topUserRating = topUsers.merge(rating_df, left_on='userId', right_on='userId', how='inner')
            # print("topUserRating: ",topUserRating)
            topUserRating['weightRating'] = topUserRating['similarityIndex']*topUserRating['rating']
            # print("topUserRating: ",topUserRating['weightRating'])

            tempTopUserRating = topUserRating.groupby('movieId').sum()[['similarityIndex', 'weightRating']]
            tempTopUserRating.columns = ['sum_similarityIndex', 'sum_weightRating']
            # print("hjvbjh: ",tempTopUserRating["sum_similarityIndex"])

            recommendation_df = pd.DataFrame()
            recommendation_df['weighted average recommendation score'] = tempTopUserRating['sum_weightRating']/tempTopUserRating['sum_similarityIndex']
            recommendation_df['movieId'] = tempTopUserRating.index
            # print("recommendation_df: ",recommendation_df)

            recommendation_df = recommendation_df.sort_values(by='weighted average recommendation score', ascending=False)
            # print(recommendation_df['movieId'])
            recommender = movie_df.loc[movie_df['movieId'].isin(recommendation_df.head(10)['movieId'].tolist())]
            print("rs: ",recommender)   
            return HttpResponse(recommender.to_json(orient="records"))

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

class MF(object):
    """docstring for CF"""
    def __init__(self, Y_data, K, lam = 0.1, Xinit = None, Winit = None,
            learning_rate = 0.5, max_iter = 1000, print_every = 100, user_based = 1):
        self.Y_raw_data = Y_data
        self.K = K
        # regularization parameter
        self.lam = lam
        # learning rate for gradient descent
        self.learning_rate = learning_rate
        # số lần lặp tối đa
        self.max_iter = max_iter
        # in kết quả sau các lần lặp print_every
        self.print_every = print_every
        # user-based or item-based
        self.user_based = user_based
        # số lượng users, items, và ratings. +1 vì id bắt đầu từ 0
        self.n_users = int(np.max(Y_data[:, 0])) + 1
        self.n_items = int(np.max(Y_data[:, 1])) + 1
        self.n_ratings = Y_data.shape[0]

        if Xinit is None: # new
            self.X = np.random.randn(self.n_items, K)
        else: # or from saved data
            self.X = Xinit
        if Winit is None:
            self.W = np.random.randn(K, self.n_users)
        else: # từ dữ liệu đã lưu
            self.W = Winit
        # dữ liệu đã chuẩn hóa, cập nhật sau trong hàm normalized_Y
        self.Y_data_n = self.Y_raw_data.copy()

    def normalize_Y(self):
        if self.user_based:
            user_col = 0
            item_col = 1
            n_objects = self.n_users

        # nếu muốn chuẩn hóa dựa trên item, chỉ cần chuyển đổi hai cột dữ liệu đầu tiên
        else: # item bas
            user_col = 1
            item_col = 0
            n_objects = self.n_items

        users = self.Y_raw_data[:, user_col]
        self.mu = np.zeros((n_objects,))
        for n in range(n_objects):
          # row chỉ rating được thực hiện bởi user n
            # since indices need to be integers, we need to convert
            ids = np.where(users == n)[0].astype(np.int32)
            #  chỉ số của tất cả các rating được liên kết với user n
            item_ids = self.Y_data_n[ids, item_col]
            # and the corresponding ratings
            ratings = self.Y_data_n[ids, 2]
            # take mean
            m = np.mean(ratings)
            if np.isnan(m):
                m = 0 # tránh mảng trống và giá trị nan
            self.mu[n] = m
            # normalize
            self.Y_data_n[ids, 2] = ratings - self.mu[n]

# Tính giá trị hàm mất mát:
def loss(self):
        L = 0
        for i in range(self.n_ratings):
            # user, item, rating
            n, m, rate = int(self.Y_data_n[i, 0]), int(self.Y_data_n[i, 1]), self.Y_data_n[i, 2]
            L += 0.5*(rate - self.X[m, :].dot(self.W[:, n]))**2

        # Tính trung bình
        L /= self.n_ratings
        # regularization
        L += 0.5*self.lam*(np.linalg.norm(self.X, 'fro') + np.linalg.norm(self.W, 'fro'))
        return L

"""
Xác định các items được đánh giá bởi 1 user,
và users đã đánh giá 1 item và các ratings tương ứng:
"""
def get_items_rated_by_user(self, user_id):
        # Get tất cả các item được rating bởi user user_id và rating tương ứng
        ids = np.where(self.Y_data_n[:,0] == user_id)[0]
        item_ids = self.Y_data_n[ids, 1].astype(np.int32) # indices need to be integers
        ratings = self.Y_data_n[ids, 2]
        return (item_ids, ratings)

def get_users_who_rate_item(self, item_id):
        # Get tất cả các users được rating bởi item item_id và rating tương ứng
        ids = np.where(self.Y_data_n[:,1] == item_id)[0]
        user_ids = self.Y_data_n[ids, 0].astype(np.int32)
        ratings = self.Y_data_n[ids, 2]
        return (user_ids, ratings)

# Cập nhật X,W:
def updateX(self):
        for m in range(self.n_items):
            user_ids, ratings = get_users_who_rate_item(self,m)
            Wm = self.W[:, user_ids]
            # gradient
            grad_xm = -(ratings - self.X[m, :].dot(Wm)).dot(Wm.T)/self.n_ratings + \
                                               self.lam*self.X[m, :]
            self.X[m, :] -= self.learning_rate*grad_xm.reshape((self.K,))

def updateW(self):
        for n in range(self.n_users):
            item_ids, ratings = get_items_rated_by_user(self,n)
            Xn = self.X[item_ids, :]
            # gradient
            grad_wn = -Xn.T.dot(ratings - Xn.dot(self.W[:, n]))/self.n_ratings + \
                        self.lam*self.W[:, n]
            self.W[:, n] -= self.learning_rate*grad_wn.reshape((self.K,))

# Phần thuật toán chính:
def fit(self):
        self.normalize_Y()
        for it in range(self.max_iter):
            updateX(self)
            updateW(self)
            if (it + 1) % self.print_every == 0:
                rmse_train = evaluate_RMSE( self,self.Y_raw_data)
                print('iter =', it + 1, ', loss =', loss(self), ', RMSE train =', rmse_train)

# Dự đoán:
def pred(self, u, i):
        # Dự đoán xếp hạng của user u cho item i (chuẩn hóa) nếu cần
        u = int(u)
        i = int(i)
        if self.user_based:
            bias = self.mu[u]
        else:
            bias = self.mu[i]
        pred = self.X[i, :].dot(self.W[:, u]) + bias
        #  Cắt ngắn nếu kết quả nằm ngoài phạm vi [0, 5]
        if pred < 0:
            return 0
        if pred > 5:
            return 5
        return pred


def pred_for_user(self, user_id):
        # Dự đoán xếp hạng  mà một user đưa ra cho tất cả các item  chưa được xếp hạng
        ids = np.where(self.Y_data_n[:, 0] == user_id)[0]
        items_rated_by_u = self.Y_data_n[ids, 1].tolist()

        y_pred = self.X.dot(self.W[:, user_id]) + self.mu[user_id]
        predicted_ratings= []
        for i in range(self.n_items):
            if i not in items_rated_by_u:
                predicted_ratings.append((i, y_pred[i]))

        return predicted_ratings