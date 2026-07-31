# ForgeProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.492262Z
**Run ID**: RUN-016
**Seed**: 1700000016

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: load_balanced
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: tree_structure
- Commit Method: index_based

## Recovery

- Strategy: state_transfer
- Snapshot Policy: periodic

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: crash_recovery

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 313ms
- Election Timeout Base: 390ms
- Election Timeout Range: 122ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:randomized_timeout
- voting:hierarchical_quorum
- vote_granting:grant_based_on_priority
- concept:majority_quorum
- log:command_log
- log_structure:tree_structure
- commit:index_based
- recovery:state_transfer
- snapshot:periodic
- dynamic_membership:single_config
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 64
- Elections Succeeded: 52
- Election Success Rate: 81.25%
- Messages Sent: 198
- Commits: 14
- Avg Messages/Commit: 14.14
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 55
- Elections Succeeded: 43
- Election Success Rate: 78.18%
- Messages Sent: 235
- Commits: 15
- Avg Messages/Commit: 15.67
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 59
- Election Success Rate: 100.00%
- Messages Sent: 476
- Commits: 22
- Avg Messages/Commit: 21.64
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 63
- Elections Succeeded: 63
- Election Success Rate: 100.00%
- Messages Sent: 635
- Commits: 27
- Avg Messages/Commit: 23.52
- Leader Changes: 63
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

