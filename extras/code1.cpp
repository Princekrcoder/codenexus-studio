#include <iostream>
using namespace std;

class LivingBeing {
public:
    virtual void makeSound() {
        cout << "Living being makes a sound" << endl;
    }

    virtual ~LivingBeing() {}
};

class Dog : public LivingBeing {
public:
    void makeSound() override {
        cout << "Dog barks" << endl;
    }
};


class Cat : public LivingBeing {
public:
    void makeSound() override {
        cout << "Cat meows" << endl;
    }
};

class Cow : public LivingBeing {
public:
    void makeSound() override {
        cout << "Cow moos" << endl;
    }
};

int main() {
    LivingBeing* obj;

    Dog d;
    Cat c;
    Cow cw;

    obj = &d;
    obj->makeSound();

    obj = &c;
    obj->makeSound();

    obj = &cw;
    obj->makeSound();

    return 0;
}