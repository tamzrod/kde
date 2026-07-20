# ForgeProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.799329Z
**Run ID**: RUN-079
**Seed**: 1700000079

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: linked_list
- Commit Method: majority_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: size_based

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: gossip
- Model: byzantine

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 358ms
- Election Timeout Base: 182ms
- Election Timeout Range: 141ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:term_epochs
- concept:randomized_timeout
- voting:hierarchical_quorum
- vote_granting:grant_if_log_newer
- concept:majority_quorum
- log:state_machine
- log_structure:linked_list
- commit:majority_commit
- recovery:hybrid_recovery
- snapshot:size_based
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 50
- Elections Succeeded: 35
- Election Success Rate: 70.00%
- Messages Sent: 132
- Commits: 14
- Avg Messages/Commit: 9.43
- Leader Changes: 35
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 65
- Elections Succeeded: 54
- Election Success Rate: 83.08%
- Messages Sent: 351
- Commits: 19
- Avg Messages/Commit: 18.47
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 46
- Elections Succeeded: 37
- Election Success Rate: 80.43%
- Messages Sent: 358
- Commits: 18
- Avg Messages/Commit: 19.89
- Leader Changes: 37
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 54
- Elections Succeeded: 48
- Election Success Rate: 88.89%
- Messages Sent: 422
- Commits: 18
- Avg Messages/Commit: 23.44
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

