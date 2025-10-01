import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  author: string;
  rating: number;
  category: string;
  text: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: 'Алексей Иванов',
    rating: 5,
    category: 'Услуги',
    text: 'Отличный сервис! Быстро, качественно, профессионально. Рекомендую всем.',
    date: '2025-09-28',
    status: 'approved'
  },
  {
    id: 2,
    author: 'Мария Петрова',
    rating: 4,
    category: 'Товары',
    text: 'Хорошее качество продукции, но доставка могла быть быстрее.',
    date: '2025-09-27',
    status: 'approved'
  },
  {
    id: 3,
    author: 'Дмитрий Сидоров',
    rating: 5,
    category: 'Услуги',
    text: 'Превосходно! Именно то, что я искал. Буду обращаться снова.',
    date: '2025-09-26',
    status: 'approved'
  },
  {
    id: 4,
    author: 'Екатерина Смирнова',
    rating: 3,
    category: 'Товары',
    text: 'Неплохо, но есть куда расти. Цена соответствует качеству.',
    date: '2025-09-25',
    status: 'pending'
  },
  {
    id: 5,
    author: 'Игорь Козлов',
    rating: 5,
    category: 'Поддержка',
    text: 'Отзывчивая служба поддержки, решили мою проблему за считанные минуты!',
    date: '2025-09-24',
    status: 'approved'
  },
  {
    id: 6,
    author: 'Ольга Новикова',
    rating: 4,
    category: 'Товары',
    text: 'Качественный товар, упаковка отличная. Спасибо!',
    date: '2025-09-23',
    status: 'approved'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    category: 'Услуги',
    text: ''
  });

  const filteredReviews = mockReviews
    .filter(review => {
      if (filterCategory !== 'all' && review.category !== filterCategory) return false;
      if (filterRating !== 'all' && review.rating !== parseInt(filterRating)) return false;
      if (activeTab === 'moderation') return review.status === 'pending';
      return review.status === 'approved';
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const averageRating = mockReviews.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.rating, 0) / mockReviews.filter(r => r.status === 'approved').length;
  const totalReviews = mockReviews.filter(r => r.status === 'approved').length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < rating ? 'Star' : 'Star'}
        size={18}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Платформа отзывов</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('home')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveTab('moderation')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'moderation' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Модерация
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'faq' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                О нас
              </button>
            </nav>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hidden md:flex">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить отзыв
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Новый отзыв</DialogTitle>
                  <DialogDescription>Поделитесь своим опытом с другими</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ваше имя</label>
                    <Input
                      placeholder="Введите имя"
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Категория</label>
                    <Select
                      value={newReview.category}
                      onValueChange={(value) => setNewReview({ ...newReview, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Услуги">Услуги</SelectItem>
                        <SelectItem value="Товары">Товары</SelectItem>
                        <SelectItem value="Поддержка">Поддержка</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Оценка</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="transition-transform hover:scale-110"
                        >
                          <Icon
                            name="Star"
                            size={24}
                            className={
                              star <= newReview.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Отзыв</label>
                    <Textarea
                      placeholder="Расскажите о вашем опыте..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">Отправить отзыв</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover-scale">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                      <Icon name="Star" size={24} className="text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{averageRating.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Средний рейтинг</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                      <Icon name="MessageSquare" size={24} className="text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{totalReviews}</p>
                    <p className="text-sm text-muted-foreground">Всего отзывов</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                      <Icon name="TrendingUp" size={24} className="text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">Довольных клиентов</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-lg border">
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[180px]">
                    <Icon name="Filter" size={16} className="mr-2" />
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    <SelectItem value="Услуги">Услуги</SelectItem>
                    <SelectItem value="Товары">Товары</SelectItem>
                    <SelectItem value="Поддержка">Поддержка</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-[180px]">
                    <Icon name="Star" size={16} className="mr-2" />
                    <SelectValue placeholder="Рейтинг" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все оценки</SelectItem>
                    <SelectItem value="5">5 звезд</SelectItem>
                    <SelectItem value="4">4 звезды</SelectItem>
                    <SelectItem value="3">3 звезды</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <Icon name="ArrowUpDown" size={16} className="mr-2" />
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">По дате</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {review.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{review.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{review.category}</Badge>
                      </div>
                      <div className="flex space-x-1">{renderStars(review.rating)}</div>
                      <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'moderation' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Модерация отзывов</h2>
                <p className="text-muted-foreground mt-2">
                  Управляйте новыми отзывами перед публикацией
                </p>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {mockReviews.filter(r => r.status === 'pending').length} на модерации
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="hover-scale">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {review.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{review.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{review.category}</Badge>
                          <Badge variant="outline">На модерации</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-1">{renderStars(review.rating)}</div>
                      <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
                      <div className="flex space-x-3 pt-4 border-t">
                        <Button variant="default" size="sm" className="flex-1">
                          <Icon name="Check" size={16} className="mr-2" />
                          Одобрить
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="X" size={16} className="mr-2" />
                          Отклонить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Вопросы и ответы</h2>
              <p className="text-muted-foreground">
                Ответы на часто задаваемые вопросы о платформе отзывов
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg border px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Как добавить отзыв?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Нажмите кнопку "Добавить отзыв" в верхней части страницы, заполните форму с
                  вашим именем, выберите категорию, поставьте оценку и напишите текст отзыва.
                  После отправки отзыв попадёт на модерацию.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg border px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Как работает модерация?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Все новые отзывы проходят проверку модератором перед публикацией. Это помогает
                  поддерживать качество контента и отфильтровывать нежелательные сообщения.
                  Обычно модерация занимает до 24 часов.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg border px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Можно ли редактировать отзыв?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  В текущей версии платформы редактирование опубликованных отзывов недоступно.
                  Если вам нужно изменить свой отзыв, свяжитесь с поддержкой.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg border px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Как работают фильтры?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Вы можете фильтровать отзывы по категориям (Услуги, Товары, Поддержка) и по
                  рейтингу (от 1 до 5 звёзд). Также доступна сортировка по дате или рейтингу.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg border px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Как рассчитывается средний рейтинг?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Средний рейтинг рассчитывается на основе всех опубликованных отзывов. Отзывы
                  на модерации не учитываются в общей статистике.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">О нас</h2>
              <p className="text-lg text-muted-foreground">
                Современная платформа для сбора и управления отзывами
              </p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Наша миссия</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы создали эту платформу, чтобы сделать процесс сбора и обработки отзывов
                    максимально простым и эффективным. Наша цель — помочь компаниям улучшать
                    качество сервиса на основе реальных отзывов клиентов.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Преимущества</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Shield" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Модерация</p>
                        <p className="text-sm text-muted-foreground">
                          Проверка всех отзывов перед публикацией
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Filter" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Фильтрация</p>
                        <p className="text-sm text-muted-foreground">
                          Удобные фильтры по категориям и рейтингу
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Zap" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Быстрота</p>
                        <p className="text-sm text-muted-foreground">
                          Моментальная публикация после одобрения
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="BarChart" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Аналитика</p>
                        <p className="text-sm text-muted-foreground">
                          Статистика и средний рейтинг
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Контакты</h3>
                  <div className="space-y-2">
                    <p className="text-muted-foreground flex items-center">
                      <Icon name="Mail" size={18} className="mr-2 text-primary" />
                      support@reviews.com
                    </p>
                    <p className="text-muted-foreground flex items-center">
                      <Icon name="Phone" size={18} className="mr-2 text-primary" />
                      +7 (800) 123-45-67
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="MessageSquare" size={24} className="text-primary" />
              <span className="font-semibold text-foreground">Платформа отзывов</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Все права защищены
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
