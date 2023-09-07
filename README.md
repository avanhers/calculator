# Calculator

Simple javascript calculator,


##### Exercice: 
Allow solving expression like

- 24 + 14
- (21 + 14) * 2
- (4 + 9) / (2 + 1)



 ##### Additional features
It allow following additional features and any combination of them
  
|                                 description                                  | example                 | validity                    |
|:----------------------------------------------------------------------------:| ----------------------- | --------------------------- |
|      no bracket needed if negative number is at the start of operation:      | -5 + 3 * 7              | :white_check_mark:          |
| no bracket needed if negative number is first number in a bracket operation: | 5 * (-3 + 7)            | :white_check_mark:          |
|               bracket needed if it follow a classic operator:                | 6 * (-7)                | :white_check_mark:          |
|                                                                              | 6 * -7                  | :x: need bracket            |
|                             allow floating point                             | 4.2 * 3                 | :white_check_mark:          |
|                                                                              | 0.125 * 3.2             | :white_check_mark:          |
|                                                                              | .45 * 7                 | :x: should be preceded by 0 |
|                              nested     bracket                              | ((5-3) * (6-5)) * (6-2) | :white_check_mark:          |
|                                                                              |                         |                             |


##### Run program

  

```bash
    make run 
```

#### Possible improvment
- [ ] Validate input || better error handling
- [ ] more tests
