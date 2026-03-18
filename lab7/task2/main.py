from models import Animal, Dog, Cat

def main():
    #instances
    animals = [
        Dog("Rex", 5, "Labrador"),
        Cat("Whiskers", 3, "Black"),
        Animal("Generic", 2, "Unknown")
    ]

    #demonstration polymorphism
    for animal in animals:
        print(animal)                #__str__ method
        print(animal.info())         #parent method
        print(f"{animal.name} says: {animal.speak()}")  #polymorphic speak

        if isinstance(animal, Dog):
            print(animal.fetch("ball"))
        elif isinstance(animal, Cat):
            print(animal.scratch())

        print("-" * 40)


if __name__ == "__main__":
    main()