from django.db import models

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
    poster = models.ImageField(null=True, blank=True)
    trailer = models.URLField()
    category = models.CharField(
        max_length=200, help_text="Nhập tên thể loại phim")
    actor = models.CharField(
        max_length=200, help_text="Nhập tên diễn viên")
    director = models.CharField(
        max_length=200, help_text="Nhập tên đạo diễn")
    date_premiere = models.DateField(blank=True, null=True)
    content = models.TextField(help_text="Nhập nội dung bộ phim")
    # created_date = models.BooleanField()

    def __str__(self):
        return str(self.title)

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
        return str(self.id)

class OrderTicket(models.Model):
    fk_username = models.ForeignKey(
        Username, on_delete=models.CASCADE)
    fk_movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE)
    fk_food = models.ForeignKey(
        Food, on_delete=models.CASCADE)
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
