from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError



class Username(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=200, help_text="Nhập họ và tên")
    email = models.EmailField(max_length=200, help_text="Nhập email")
    password = models.CharField(max_length=200, help_text="Nhập password")
    phone = models.CharField(max_length=10, help_text="Nhập số điện thoại")
    birthday = models.DateField(blank=True, null=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        ordering = ['created']
        

class Movie(models.Model):
    title = models.CharField(max_length=200, help_text="Nhập tên bộ phim")
    poster = models.URLField(null=True, blank=True,max_length=255)
    trailer = models.URLField(max_length=255)
    category = models.CharField(
        max_length=255, help_text="Nhập tên thể loại phim")
    actor = models.CharField(
        max_length=500, help_text="Nhập tên diễn viên")
    director = models.CharField(
        max_length=255, help_text="Nhập tên đạo diễn")
    date_premiere = models.DateField(blank=True, null=True)
    content = models.TextField(help_text="Nhập nội dung bộ phim")

    def __str__(self):
        return str(self.title)

class MyRating(models.Model):
    id_user = models.ForeignKey(Username, on_delete=models.CASCADE, null=True)
    id_movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True)
    rating = models.IntegerField(default=0, validators=[MaxValueValidator(5), MinValueValidator(0)])
    timestamp = models.IntegerField(default=0)
    def __str__(self):
        return str(self.id_movie)
    class Meta:
        ordering = ['rating']

class Food(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField(default=0)
    quantile_food = models.IntegerField(default=0)
    sum_food = models.IntegerField(default=0)

    def __str__(self):
        return str(self.name)

class Premiere(models.Model):
    time = models.TimeField()

    def __str__(self):
       return str(self.time)

class DayShowtime(models.Model):
    day_showtime = models.DateField(blank=True, null=True)
    fk_showtime = models.ForeignKey(
        Premiere, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.day_showtime)

class Showtime(models.Model):
    fk_dayshowtimes = models.ForeignKey(
        DayShowtime, on_delete=models.CASCADE)
    fk_movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.fk_movie)

class OrderTicket(models.Model):
    fk_username = models.ForeignKey(
        Username, on_delete=models.CASCADE)
    fk_movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE)
    fk_food = models.ForeignKey(
        Food, on_delete=models.CASCADE, null=True)
    fk_dayshowtime = models.ForeignKey(
        DayShowtime, on_delete=models.CASCADE)
    fk_time = models.ForeignKey(
        Premiere, on_delete=models.CASCADE)
    quantity_ticket = models.IntegerField(default=0)
    chair = models.CharField(max_length=200)
    summary = models.IntegerField(default=0)

    def __str__(self):
        return self.chair

class Question(models.Model):
    fk_username = models.ForeignKey(
        Username, on_delete=models.CASCADE)
    text_help = models.TextField(help_text="Nhập nội dung câu hỏi")
    answer = models.TextField()
    def __str__(self):
        return self.text_help
