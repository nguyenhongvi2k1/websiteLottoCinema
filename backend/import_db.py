from todo.models import Movie, MyRating
import csv

with open("./data/data_movie.csv", "r") as file:
    reader = csv.reader(file)
    reader.__next__()
    for row in reader:
        if not row[2] or not row[3]:
            continue
        else:
            Movie.objects.create(title=row[0], category=row[1], date_premiere = row[2], poster = row[3], director = row[4], content = row[5], trailer = row[6], actor = row[8] )
        
# python manage.py shell
from todo.models import Food
import csv

with open("./data/data_food.csv", "r") as file:
    reader = csv.reader(file)
    reader.__next__()
    for row in reader:
        Food.objects.create(name=row[0], price=row[1], quantile_food = row[2], sum_food = row[3])

from todo.models import Premiere
import csv

with open("./data/data_premiere.csv", "r") as file:
    reader = csv.reader(file)
    reader.__next__()
    for row in reader:
        Premiere.objects.create(time=row[0])

from todo.models import Premiere, DayShowtime
import csv

with open("./data/data_dayshowtime.csv", "r") as file:
    reader = csv.reader(file)
    reader.__next__()
    for row in reader:
        id_showtime = Premiere.objects.get(id=row[1]).id
        print(id_showtime)
        DayShowtime.objects.get_or_create(day_showtime=row[0], fk_showtime_id =id_showtime)


from todo.models import Premiere, DayShowtime, Showtime, Movie
import csv

with open("./data/data_showtime.csv", "r") as file:
    reader = csv.reader(file)
    reader.__next__()
    for row in reader:
        id_dayshowtimes = DayShowtime.objects.get(id=row[0]).id
        id_movie = Movie.objects.get(id=row[1]).id
        Showtime.objects.get_or_create(fk_dayshowtimes_id=id_dayshowtimes, fk_movie_id =id_movie)

from todo.models import Movie
import csv

with open("./data/data_sapchieu.csv", "r") as file:
    reader = csv.reader(file)
    reader.__next__()
    for row in reader:
        Movie.objects.create(title=row[0], poster=row[1], trailer = row[2], category = row[3], actor = row[4], director = row[5], date_premiere = row[6], content = row[7] )
   
from todo.models import MyRating, Movie, Username
import csv
with open("./data/ratings.csv", "r") as file:
    reader = csv.reader(file)
    reader.__next__()
    for row in reader:
        movie = Movie.objects.count()
        user = Username.objects.count()
        if int(row[1]) > movie:
            continue
        elif int(row[0]) > user:
            break
        else:
            userId = Username.objects.get(id = row[0]).id
            movieId = Movie.objects.get(id = row[1]).id
            # print("Rating: ",userId, " ", movieId)
            rating = int(float(row[2]))
            MyRating.objects.get_or_create(id_user_id=userId, id_movie_id=movieId, rating = rating, timestamp = row[3])

