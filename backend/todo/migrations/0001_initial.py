# Generated by Django 4.1.4 on 2022-12-14 15:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DayShowtime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_showtime', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('price', models.IntegerField(default=0)),
                ('quantile_food', models.IntegerField(default=0)),
                ('sum_food', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Nhập tên bộ phim', max_length=200)),
                ('poster', models.ImageField(blank=True, null=True, upload_to='')),
                ('trailer', models.URLField()),
                ('category', models.CharField(help_text='Nhập tên thể loại phim', max_length=200)),
                ('actor', models.CharField(help_text='Nhập tên diễn viên', max_length=200)),
                ('director', models.CharField(help_text='Nhập tên đạo diễn', max_length=200)),
                ('date_premiere', models.DateField(blank=True, null=True)),
                ('content', models.TextField(help_text='Nhập nội dung bộ phim')),
            ],
        ),
        migrations.CreateModel(
            name='Premiere',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Username',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(help_text='Nhập họ và tên', max_length=200)),
                ('email', models.EmailField(help_text='Nhập email', max_length=200)),
                ('password', models.CharField(help_text='Nhập password', max_length=200)),
                ('phone', models.CharField(help_text='Nhập số điện thoại', max_length=10)),
                ('birthday', models.DateField(blank=True, null=True)),
            ],
            options={
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='Showtime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fk_dayshowtimes', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.dayshowtime')),
                ('fk_movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.movie')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_help', models.TextField(help_text='Nhập nội dung câu hỏi')),
                ('answer', models.TextField()),
                ('fk_username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.username')),
            ],
        ),
        migrations.CreateModel(
            name='OrderTicket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity_ticket', models.IntegerField(default=0)),
                ('chair', models.CharField(max_length=200)),
                ('summary', models.IntegerField(default=0)),
                ('fk_dayshowtime', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.dayshowtime')),
                ('fk_food', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.food')),
                ('fk_movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.movie')),
                ('fk_time', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.premiere')),
                ('fk_username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.username')),
            ],
        ),
        migrations.AddField(
            model_name='dayshowtime',
            name='fk_showtime',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.premiere'),
        ),
    ]
